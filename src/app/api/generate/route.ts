// src/app/api/generate/route.ts
import { NextResponse } from "next/server";
import axios from "axios"; // 需要安装 sharp 包用于图片处理
import { getUser } from "@/service/user";
import { User } from "@/types/user";
import { changeUserCredits } from "@/models/user";

export async function POST(request: Request) {
  try {
    const { prompt, style, templateId } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "请提供描述文字" }, { status: 400 });
    }

    let userInfo: User = await getUser(request);

    if (userInfo.id == 0) {
      return NextResponse.json({ error: "未登录，请先登录" }, { status: 500 });
    }
    if ((userInfo.credits || 0) < 1)
      return NextResponse.json(
        { error: "积分不足，请先充值" },
        { status: 500 }
      );

    await changeUserCredits(userInfo, -1);

    const result = await axios.post(
      // "http://127.0.0.1:8080/api/logo" + "/generator",
      "http://18.144.25.101/api/logo" + "/generator",
      {
        userId: userInfo.id,
        userEmail: userInfo.email,
        prompt: prompt,
        templateId,
        style,
      }
    );

    return NextResponse.json(result.data);
    // // 调用 AI API 生成图片
    // const response = await fetch(
    //   `https://api.zhishuyun.com/openai/dall-e-3?token=${apiKey}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       model: "dall-e-3",
    //       size: "1024x1024",
    //       quality: "hd",
    //       response_format: "url",
    //       prompt: stylePrompt + prompt,
    //     }),
    //   }
    // );

    // if (!response.ok) {
    //   throw new Error("API request failed");
    // }

    // const data = await response.json();
    // const aiGeneratedImageUrl = data.data[0].url;

    // // 下载生成的图片
    // const imageResponse = await fetch(aiGeneratedImageUrl);
    // if (!imageResponse.ok)
    //   throw new Error("Failed to download generated image");
    // const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    // // 生成缩略图
    // const thumbnailBuffer = await sharp(imageBuffer)
    //   .resize(300, 300, {
    //     // 设置缩略图尺寸
    //     fit: "contain",
    //     background: { r: 255, g: 255, b: 255, alpha: 1 },
    //   })
    //   .png()
    //   .toBuffer();

    // // 生成文件名
    // const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    // const s3Key = `logos/${fileName}.png`;
    // const s3ThumbKey = `logos/${fileName}_thumb.png`;

    // // 上传原图和缩略图到 S3
    // await Promise.all([
    //   s3Client.send(
    //     new PutObjectCommand({
    //       Bucket: process.env.AWS_S3_BUCKET!,
    //       Key: s3Key,
    //       Body: imageBuffer,
    //       ContentType: "image/png",
    //     })
    //   ),
    //   s3Client.send(
    //     new PutObjectCommand({
    //       Bucket: process.env.AWS_S3_BUCKET!,
    //       Key: s3ThumbKey,
    //       Body: thumbnailBuffer,
    //       ContentType: "image/png",
    //     })
    //   ),
    // ]);

    // // 构建 S3 URL
    // const s3Url = `https://${process.env.AWS_S3_BUCKET}.s3.us-west-1.amazonaws.com/${s3Key}`;
    // const prisma = getPrisma();

    // // 保存到数据库
    // try {
    //   const savedLogo = await prisma.logoHistory.create({
    //     data: {
    //       prompt,
    //       imageUrl: s3Url,
    //       templateId: templateId || style,
    //     },
    //   });
    // } catch (dbError) {
    //   console.error("Database error:", dbError);
    // }

    // return NextResponse.json({ imageUrl: s3Url });
  } catch (error) {
    console.error("Logo generation error:", error);
    return NextResponse.json({ error: "生成失败" }, { status: 500 });
  }
}
