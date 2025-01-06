import { useState } from "react"; // 引入 useState 钩子
import { loadStripe } from "@stripe/stripe-js"; // 引入 Stripe

export default function () {
  const [loadingPlan, setLoadingPlan] = useState(""); // 新增状态来管理按钮的加载状态

  const handleCheckout = async (amount: number, credits: number, plan: string): Promise<void> => {
    setLoadingPlan(plan); // 设置正在加载的套餐

    const params = {
      amount,
      credits,
      plan,
    };
    console.log("checkout", params);
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    console.log("checkout res", response);
    const { code, message, data } = await response.json();
    if (!data) {
      setLoadingPlan(""); // 如果出错，重置加载状态
      return;
    }
    const { url } = data;
    window.location.href = url; // 跳转到 Stripe Checkout 页面
  };

  return (
    <section>
      <div className="mx-auto max-w-7xl px-5 py-4 md:px-10 lg:py-6">
        <div className="mx-auto mb-8 max-w-3xl text-center md:mb-12 lg:mb-16">
          <h2 className="text-3xl font-medium md:text-5xl">
            Creatsy.ai Premium
          </h2>
          <p className="mt-4 text-sm text-[#636262] sm:text-base">
            Transform Your Device with Exclusive AI-Crafted Wallpapers
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
          {/* Basic Plan */}
          <div className="b mx-auto flex w-full max-w-md flex-col items-start rounded-md border border-[#cdcdcd] p-8">
            <div className="mb-4 rounded-[4px] bg-black px-4 py-1.5">
              <p className="text-sm font-bold text-white sm:text-sm">BASIC</p>
            </div>
            <h2 className="mb-5 text-3xl font-bold md:mb-6 md:text-5xl lg:mb-8">
              $9.9
            </h2>
            <button
              className="mb-5 w-full rounded-md bg-black px-6 py-3 text-center font-semibold text-white hover:bg-gray-700 md:mb-6 lg:mb-8"
              onClick={() => handleCheckout(990, 15, "basic")}
              disabled={loadingPlan === "basic"} // 禁用按钮如果正在加载
            >
              {loadingPlan === "basic" ? "Redirecting..." : "Get started"}
            </button>
            <div className="mt-2 flex items-center">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94a84be6cf60_check-mark.svg"
                alt=""
                className="mr-2 inline-block w-4"
              />
              <p className="text-base">15 generations of AI wallpapers</p>
            </div>
            <div className="mt-2 flex items-center">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94a84be6cf60_check-mark.svg"
                alt=""
                className="mr-2 inline-block w-4"
              />
              <p className="text-base">Standard generation speed</p>
            </div>
            <div className="mt-2 flex items-center">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94a84be6cf60_check-mark.svg"
                alt=""
                className="mr-2 inline-block w-4"
              />
              <p className="text-base">Basic resolution wallpaper</p>
            </div>
            <div className="mt-2 flex items-center">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94a84be6cf60_check-mark.svg"
                alt=""
                className="mr-2 inline-block w-4"
              />
              <p className="text-base">Unlimited wallpaper storage</p>
            </div>
          </div>

          {/* Standard Plan */}
          <div className="b mx-auto flex w-full max-w-md flex-col items-start rounded-md border border-[#cdcdcd] bg-[#f2f2f7] p-8">
            <div className="mb-4 rounded-[4px] bg-black px-4 py-1.5">
              <p className="text-sm font-bold text-white sm:text-sm">STANDARD</p>
            </div>
            <h2 className="mb-5 text-3xl font-bold md:mb-6 md:text-5xl lg:mb-8">
              $19.9
            </h2>
            <button
              className="mb-5 w-full rounded-md bg-black px-6 py-3 text-center font-semibold text-white hover:bg-gray-700 md:mb-6 lg:mb-8"
              onClick={() => handleCheckout(1990, 50, "standard")}
              disabled={loadingPlan === "standard"} // 禁用按钮如果正在加载
            >
              {loadingPlan === "standard" ? "Redirecting..." : "Get started"}
            </button>
            <div className="mt-2 flex items-center">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94a84be6cf60_check-mark.svg"
                alt=""
                className="mr-2 inline-block w-4"
              />
              <p className="text-base">50 generations of AI wallpapers</p>
            </div>
            <div className="mt-2 flex items-center">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94a84be6cf60_check-mark.svg"
                alt=""
                className="mr-2 inline-block w-4"
              />
              <p className="text-base">Faster generation speed</p>
            </div>
            <div className="mt-2 flex items-center">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94a84be6cf60_check-mark.svg"
                alt=""
                className="mr-2 inline-block w-4"
              />
              <p className="text-base">HD resolution wallpapers</p>
            </div>
            <div className="mt-2 flex items-center">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94a84be6cf60_check-mark.svg"
                alt=""
                className="mr-2 inline-block w-4"
              />
              <p className="text-base">Unlimited wallpaper storage</p>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="b mx-auto flex w-full max-w-md flex-col items-start rounded-md border border-[#cdcdcd] p-8">
            <div className="mb-4 rounded-[4px] bg-black px-4 py-1.5">
              <p className="text-sm font-bold text-white sm:text-sm">PREMIUM</p>
            </div>
            <h2 className="mb-5 text-3xl font-bold md:mb-6 md:text-5xl lg:mb-8">
              $29.9
            </h2>
            <button
              className="mb-5 w-full rounded-md bg-black px-6 py-3 text-center font-semibold text-white hover:bg-gray-700 md:mb-6 lg:mb-8"
              onClick={() => handleCheckout(2990, 100, "premium")}
              disabled={loadingPlan === "premium"} // 禁用按钮如果正在加载
            >
              {loadingPlan === "premium" ? "Redirecting..." : "Get started"}
            </button>
            <div className="mt-2 flex items-center">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94a84be6cf60_check-mark.svg"
                alt=""
                className="mr-2 inline-block w-4"
              />
              <p className="text-base">100 generations of AI wallpapers</p>
            </div>
            <div className="mt-2 flex items-center">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94a84be6cf60_check-mark.svg"
                alt=""
                className="mr-2 inline-block w-4"
              />
              <p className="text-base">Fastest generation speed</p>
            </div>
            <div className="mt-2 flex items-center">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94a84be6cf60_check-mark.svg"
                alt=""
                className="mr-2 inline-block w-4"
              />
              <p className="text-base">Ultra HD resolution wallpapers</p>
            </div>
            <div className="mt-2 flex items-center">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94a84be6cf60_check-mark.svg"
                alt=""
                className="mr-2 inline-block w-4"
              />
              <p className="text-base">Unlimited wallpaper storage</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
