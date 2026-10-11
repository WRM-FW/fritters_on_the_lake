# Fritters on the Lake 官方网站 · 项目说明（中文）

> 本文档仅用于项目说明，网站本身是英文站点，面向欧美访客，不含中文界面。
> 英文版说明见 [README.md](README.md)，逐条事实来源见 [docs/verified-facts.md](docs/verified-facts.md)。

- 线上地址：https://wrm-fw.github.io/fritters_on_the_lake/
- 仓库：https://github.com/WRM-FW/fritters_on_the_lake
- 餐厅：Fritters on the Lake，217 King St, Niagara-on-the-Lake, ON L0S 1J0, Canada

## 一、这是什么

加拿大安大略省滨湖尼亚加拉（Niagara-on-the-Lake）一家家庭苹果炸糕店的官方网站。**移动端优先**静态站点：没有构建步骤、没有依赖、没有后端，只有 `index.html` + 一个样式表 + 一个 3 KB 脚本，直接以分支方式部署在 GitHub Pages。

```
index.html                 单页站点（英文）
assets/css/styles.css      移动优先样式，1000px 以上做次要桌面适配
assets/js/app.js           营业时间状态计算（按 America/Toronto 时区）
assets/img/                图片（webp + jpg 双份）、应用图标
favicon.svg                站点图标
manifest.webmanifest       添加到主屏所需的应用清单
.nojekyll                  关闭 Pages 的 Jekyll 处理
docs/verified-facts.md     逐条事实来源与放弃使用的说法
```

本地预览：直接双击 `index.html` 也可以，或者

```
python -m http.server 8000
```

## 二、内容口径：只写有据可查的

页面上每一条事实都能追溯到下面四类来源之一。核对日期为 2026-10-11。

| 网站内容 | 来源 |
| --- | --- |
| 地址、电话 +1 905-246-2312、评分 4.9、"位于 Little Blue House"、无障碍入口 | 该店 Google 地图地点页（feature id `/g/11rc2qqjmd`，CID `7511922284746744062`） |
| 营业时间：周四至周日 10:00am–5:00pm，周一至周三休息 | 餐厅自己 Instagram 上的 Opening Hours 公告卡 |
| 冬季改为周六周日 12:00–5:00pm、每年春天歇业数周、圣诞元旦安排 | 餐厅自己的 New Winter Hours / 假日营业公告卡 |
| 全部菜单与价格（Dozen $29.00、Half Dozen $18.50、Lake Special $12.50、Double $7.50、三种糖浆各 $2.50、Water $3.50 / Perrier $4.00 / Soda $3.50） | 店内菜单板实拍照片（2026 年 7 月） |
| 制法（McIntosh 苹果、机器削皮去核切片、裹糊现炸、撒肉桂糖）、塞尔维亚背景、Dušanka 的配方、女儿 Zorana 在南非、2021 年 6 月开业、与 Balzac's 的邻里关系 | 挂在店里的《Niagara This Week》报道（记者 Luke Edwards） |
| 过敏原、是否素食、预订规则 | 餐厅自己的 FAQ 图文卡 |
| 8 月蜜桃节限定蜜桃炸糕 | 餐厅自己的 Peach Festival 海报 |
| 订餐入口（Pickup / Delivery，由 Uber Eats 承接） | 该店 Google 地点页的 "Order online" 动作，已实测打开 |

**刻意没有写的**（原因记录在 `docs/verified-facts.md`）：物料包里那份《综合分析报告》描述的"苹果活力红主色、招牌与包装都是红色"——与实拍照片不符，真实招牌、遮阳棚、包装贴纸都是**叶绿底 + 白色苹果线稿**；此外 Tater Twisters 这个菜名与价格、$5.25 苹果沙冰、Appletiser 饮品、"64 岁初次创业"、"@tiana_ic 设计 Logo"、停车细则、配送范围等无法核实的说法，全部未使用。

## 三、设计依据

- **配色取自实拍**：招牌绿 `#5C8547`、奶油底 `#FBF7EE`、肉桂金 `#A9682E`，不是凭空配的通用餐厅色。
- **字体**：标题用 Georgia（各系统自带），正文用系统无衬线，不下载任何 web font，移动端首屏更快。
- **动效**：只有按钮按压与锚点平滑滚动，没有装饰性动画；尊重 `prefers-reduced-motion`。
- **叙事顺序按手机用户的真实需求排**：先看清是什么（Hero）→ 立刻能订（两个大按钮 + 底部固定栏）→ 卖什么、多少钱 → 看图 → 品牌故事与评价 → 地址、营业时间、注意事项、常见问题。

## 四、移动端优先的具体做法

- 全站单列，**320 / 360 / 390 / 430 px 实测均无横向溢出**（用 `scrollWidth == innerWidth` 逐个量过），没有需要左右滑动才能看的内容。
- 触控尺寸：主按钮 52 px 高，底部栏 60 px，导航项 44 px 以上。
- 底部固定 **Order · Call · Directions** 操作栏，用 `env(safe-area-inset-bottom)` 避让 iPhone 与 Android 手势区，`body` 预留内边距防止内容被遮挡；1000 px 以上自动隐藏。
- 视口用 `viewport-fit=cover` + `svh` 单位，避开手机浏览器地址栏收起时的跳动。
- 首屏负载约 **137 KB**（Hero WebP + CSS + JS），其余图片 `loading="lazy"`；全站图片合计约 746 KB。
- 图片同时输出 WebP 与 JPEG，用 `<picture>` 回退；每张都写 `width`/`height` 防布局抖动，`alt` 描述实际画面。
- 可访问性：跳转链接、`aria-current` 标注当天、`<details>` 原生折叠、可见焦点环、语义表格。

## 五、图片说明（重要）

物料包 `物料/fritters_on_the_lake_image_assets/` 里**没有任何图片文件**，只有 JSON / CSV / Markdown 元数据、一个离线画廊 HTML，以及 13 张截图（9 张 Google 地图相册、4 张 Instagram 主页）。

因此站内所有照片都是从这些截图里裁出来的**真实照片**，没有使用任何生成图或素材站图：8 张大图约 900 px 宽（门店招牌、湖畔特餐、内景两处、街口、菜单板、复古苹果海报、报纸相框），6 张小图约 185 px（受截图分辨率限制，只按这个尺寸展示，不放大）。

以后拿到原图，按同名文件替换 `assets/img/` 即可，无需改代码。

## 六、维护要点

- **营业时间会随季节变**。`assets/js/app.js` 里的 `OPEN` 常量只写了标准的周四至周日 10–5；冬季或临时闭店时状态会不准，需要同步改这个常量。页面文案始终引导访客去看 Instagram。
- **订餐链接是 Google 的**，不是餐厅自有域名。任务给到的原始链接带 `hl=zh-Hans-JP&gl=jp` 和一次性会话参数，英文访客点开会看到中文界面；已改为同一 `cvd`（地点标识）配 `hl=en&gl=ca` 并实测可用。若将来失效，把按钮指回地点页 `https://maps.google.com/?cid=7511922284746744062`。
- **资源路径全部是相对路径**，所以站点在 `/fritters_on_the_lake/` 这个子路径下能正常加载。若迁到自定义域名，需要改 `index.html` 里的 `canonical`、Open Graph 与 JSON-LD 中的绝对地址。
- 部署方式是 Pages 的分支直发（`main` 分支根目录），**没有使用 GitHub Actions**（当前 GitHub token 无 `workflow` 权限）。

## 七、交付与验证状态

- 站点代码经 PR #1 审核后已合并到 `main`，Pages 状态 built，线上已实测：子路径下所有资源 200、无破图、无控制台报错、订餐与地图链接指向正确、营业时间计算正确。
- PR #2（把可见的评价数从写死的 643 改为 "640+"，避免每周过期）待处理。
- 全站以第一人称（we / our）撰写，符合"餐厅官网"定位；若这家人并未委托建站，这个口径需要先改再对外推广。
