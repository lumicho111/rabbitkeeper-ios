# RabbitKeeper iOS

RabbitKeeper（小手机）iOS 的 **IPA 发布仓库**。主要安装与更新工具：**SideStore**。

> 尚未公开首个正式 IPA；目前已通过 Sideloadly 的首次真机安装测试。软件源在首个 IPA 发布后才会启用。

## 分发入口

- [GitHub Releases](../../releases)：下载 IPA，供用户使用自己的 Apple 账户签名安装。
- [SideStore 安装与更新说明](SIDESTORE.md)：手机安装、续签、后续无电脑覆盖更新。
- SideStore 更新源（首个正式 IPA 发布后有效）：
  `https://raw.githubusercontent.com/lumicho111/rabbitkeeper-ios/main/source.json`

## 当前发布计划

- 资源版本：**027**（主源码业务更新编号）
- iOS App 版本：**1.0.7（build 9）**；这是独立的 iOS 安装包版本号，不等同于资源编号。
- 后续新 IPA 的 iOS buildVersion 必须递增，供 SideStore 正确判断更新。
- 发布的 IPA 未由作者集中签名，用户需要借助 SideStore 等工具自行签名。
- 自动发布从私密源码仓库构建，经 Bundle ID 与 IPA 检查后上传 Releases，并同步 `source.json`。

## 状态

详见 [STATUS.md](STATUS.md)。

## 版权和来源说明

分发前应核实适用的上游和依赖许可证及源码提供义务。公开发布不会在这里包含用户私密数据、签名证书或账号密码。
