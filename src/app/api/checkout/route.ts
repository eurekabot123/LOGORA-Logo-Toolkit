import Stripe from "stripe";
import { insertOrder, updateOrderSession } from "@/models/order";
import { Order } from "@/types/order";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("checkout route");

    // 获取当前登录用户的标识
    const user = await currentUser();
    if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
      return NextResponse.json(
        { code: 1, message: "Not logged in" },
        { status: 401 }
      );
    }

    const user_email = user.emailAddresses[0].emailAddress;
    console.log("user_email", user_email);

    // 获取下单参数
    const params = await req.json();
    console.log("params", params);

    // 根据 plan 设置价格和 credits
    let amount = 0;
    let credits = 0;
    let productName = "";

    switch (params.plan) {
      case "basic":
        amount = 990;
        credits = 15;
        productName = "Basic Plan (15 AI Wallpapers)";
        break;
      case "standard":
        amount = 1990;
        credits = 50;
        productName = "Standard Plan (50 AI Wallpapers)";
        break;
      case "premium":
        amount = 2990;
        credits = 100;
        productName = "Premium Plan (100 AI Wallpapers)";
        break;
      default:
        return NextResponse.json(
          { code: 1, message: "Invalid plan selected" },
          { status: 400 }
        );
    }

    const order_no = Date.now().toString(); // 确保唯一订单号
    const created_at = new Date().toISOString();
    const expired_at = new Date(
      new Date().setMonth(new Date().getMonth() + 1)
    ).toISOString();

    // 创建订单
    const order: Order = {
      order_no: order_no,
      created_at: created_at,
      user_email: user_email,
      amount: amount,
      plan: params.plan,
      expired_at: expired_at,
      order_status: 1,
      credits: credits,
    };

    console.log("order", order);
    await insertOrder(order);

    // 调用 Stripe API 进行支付
    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY || "", {
      apiVersion: "2023-10-16",
    });

    const session = await stripe.checkout.sessions.create({
      customer_email: user_email,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: productName,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.WEB_BASE_URL}/pay-success/{CHECKOUT_SESSION_ID}?plan=${params.plan}`,
      cancel_url: `${process.env.WEB_BASE_URL}/pricing`,
      metadata: {
        order_no: order_no, // 存储订单号
        user_email: user_email, // 存储用户 email
        plan: params.plan, // 存储用户选择的套餐
      },
    });

    // 更新支付标识
    await updateOrderSession(order_no, session.id);

    // 返回 Stripe Checkout URL
    return NextResponse.json({
      code: 0,
      message: "Checkout session created",
      data: {
        url: session.url, // Stripe 返回的支付页面 URL
      },
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { code: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
