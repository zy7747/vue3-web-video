import { defineConfig, loadEnv } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import vue from "@vitejs/plugin-vue";

import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { resolve } from "path";

const getTarget = (mode: string, target: string) => {
  return loadEnv(mode, process.cwd())[target];
};

// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    base: "/web-video",
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [resolve("./src/icons")],
        // 指定symbolId格式（这里的配置与6.2步骤中的引入svg组件的name配置项写法有关）
        symbolId: "icon-[dir]-[name]",
      }),
      createHtmlPlugin({
        inject: {
          data: {
            //获取标题变量
            title: getTarget(mode, "VITE_APP_TITLE"),
          },
        },
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"), // 路径别名
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".scss"], // 使用路径别名时想要省略的后缀名，可以自己 增减
    },
    server: {
      // Listening on all local IPs
      host: true,
      port: 82,
      // 设置代理
    },
  });
