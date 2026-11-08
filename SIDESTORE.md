# RabbitKeeper：SideStore 手机上更新说明

> 当前状态以仓库 [Releases](../../releases) 和 [source.json](source.json) 为准。没有公开 IPA 时，软件源尚未启用。

## 适用对象
- iPhone/iPad 用户；特别包括 iPhone 8 Plus（iOS 16.7.16）。
- 作者负责打包并上传 IPA，用户使用自己的 Apple 账户签名。
- RabbitKeeper 不要求用户提供 Apple 账户密码给作者。

## 第一次安装
1. 参照 [SideStore 官方安装说明](https://docs.sidestore.io/zh/docs/installation/install) 在 Windows 或 Mac 上安装 SideStore。第一次需要电脑、数据线和配对配置。
2. 在 iPhone 按官方说明信任开发者、开启开发者模式，并完成 LocalDevVPN/配对步骤。
3. 打开 SideStore，添加 RabbitKeeper 软件源（正式发布后可用）：
   `https://raw.githubusercontent.com/lumicho111/rabbitkeeper-ios/main/source.json`
4. 选择 RabbitKeeper，按 SideStore 提示签名安装。

## 后续更新（不需要每次用电脑）
- 作者通过 GitHub Releases 发布新的 IPA，更新源随之写入新版本。
- 用户打开 SideStore → RabbitKeeper → Update，连接要求的 Wi-Fi/LocalDevVPN，按提示完成手机端安装。
- 免费 Apple 账户一般需要约每 7 天续签；SideStore 续签与下载新版本是两回事。后台续签不能保证每次成功。

## 数据保护
- **不要在升级前卸载 App**：卸载可能删除聊天、角色和日记。
- 保持同一 Apple 账户，并尽量使用同一签名工具、同一 SideStore 应用标识。
- 从 Sideloadly 换到 SideStore 不保证保留旧数据；当前仅在空数据测试机上进行迁移。
- 正式推广前必须完成“测试数据 → SideStore 覆盖安装新版 → 验证数据仍在”测试。

## 作者发布流程
- 业务源码在私密 `raccoonphonetest` 仓库，iOS 发布文件在本仓库。
- 使用私密仓库 Actions 的 `Publish RabbitKeeper IPA to SideStore` 工作流。
- 首次出版 Resource 027 使用 `1.0.7 / build 9`；下次更新必须提高 iOS buildVersion，例如 build 10。
- 公共仓库只放 IPA、版本索引和图标，不要放私密仓库的签名凭据。
