# dlr-form

## 基于mcommon，改造的配置型el-form和el-table开发。
### 新增功能：
1. form 可以配置查看或者修改选项 isPreview
2. form 可以配置审批选项，可以显示字段的历史更改 isReview

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm serve
```

## 使用方式
1. 拷贝src/package下所有文件到您的代码库中component/dlr-common 下
2. 在main.js中全局引入并使用
```
import DlrCommon from '@/component/dlr-common';

Vue.use(DlrCommon);
```
3. 在项目中拷贝生成的代码文件并启动

