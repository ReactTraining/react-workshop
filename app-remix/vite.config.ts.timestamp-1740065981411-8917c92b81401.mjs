// vite.config.ts
import { vitePlugin as remix } from "file:///Users/bradwestfall/Desktop/ReactTraining/Projects/react-workshop/app-remix/node_modules/@remix-run/dev/dist/index.js";
import tsconfigPaths from "file:///Users/bradwestfall/Desktop/ReactTraining/Projects/react-workshop/app-remix/node_modules/vite-tsconfig-paths/dist/index.js";
import { defineConfig } from "file:///Users/bradwestfall/Desktop/ReactTraining/Projects/react-workshop/app-remix/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig({
  server: {
    port: 3e3
  },
  plugins: [
    remix({
      appDirectory: process.env.REMIX_APP_DIR || "./app",
      // Only needed in pre 2.0
      ignoredRouteFiles: ["**/*.css"],
      // Since lessons override the default app directory, we still need to
      // add a watcher to the app dir for shared files that lessons might use
      // watchPaths: ['./app'],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true
      }
    }),
    tsconfigPaths()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYnJhZHdlc3RmYWxsL0Rlc2t0b3AvUmVhY3RUcmFpbmluZy9Qcm9qZWN0cy9yZWFjdC13b3Jrc2hvcC9hcHAtcmVtaXhcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9icmFkd2VzdGZhbGwvRGVza3RvcC9SZWFjdFRyYWluaW5nL1Byb2plY3RzL3JlYWN0LXdvcmtzaG9wL2FwcC1yZW1peC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvYnJhZHdlc3RmYWxsL0Rlc2t0b3AvUmVhY3RUcmFpbmluZy9Qcm9qZWN0cy9yZWFjdC13b3Jrc2hvcC9hcHAtcmVtaXgvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyB2aXRlUGx1Z2luIGFzIHJlbWl4IH0gZnJvbSAnQHJlbWl4LXJ1bi9kZXYnXG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tICd2aXRlLXRzY29uZmlnLXBhdGhzJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcblxuZGVjbGFyZSBtb2R1bGUgJ0ByZW1peC1ydW4vbm9kZScge1xuICAvLyBvciBjbG91ZGZsYXJlLCBkZW5vLCBldGMuXG4gIGludGVyZmFjZSBGdXR1cmUge1xuICAgIHYzX3NpbmdsZUZldGNoOiB0cnVlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwMCxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlbWl4KHtcbiAgICAgIGFwcERpcmVjdG9yeTogcHJvY2Vzcy5lbnYuUkVNSVhfQVBQX0RJUiB8fCAnLi9hcHAnLFxuICAgICAgLy8gT25seSBuZWVkZWQgaW4gcHJlIDIuMFxuXG4gICAgICBpZ25vcmVkUm91dGVGaWxlczogWycqKi8qLmNzcyddLFxuXG4gICAgICAvLyBTaW5jZSBsZXNzb25zIG92ZXJyaWRlIHRoZSBkZWZhdWx0IGFwcCBkaXJlY3RvcnksIHdlIHN0aWxsIG5lZWQgdG9cbiAgICAgIC8vIGFkZCBhIHdhdGNoZXIgdG8gdGhlIGFwcCBkaXIgZm9yIHNoYXJlZCBmaWxlcyB0aGF0IGxlc3NvbnMgbWlnaHQgdXNlXG4gICAgICAvLyB3YXRjaFBhdGhzOiBbJy4vYXBwJ10sXG4gICAgICBmdXR1cmU6IHtcbiAgICAgICAgdjNfZmV0Y2hlclBlcnNpc3Q6IHRydWUsXG4gICAgICAgIHYzX3JlbGF0aXZlU3BsYXRQYXRoOiB0cnVlLFxuICAgICAgICB2M190aHJvd0Fib3J0UmVhc29uOiB0cnVlLFxuICAgICAgICB2M19zaW5nbGVGZXRjaDogdHJ1ZSxcbiAgICAgICAgdjNfbGF6eVJvdXRlRGlzY292ZXJ5OiB0cnVlLFxuICAgICAgfSxcbiAgICB9KSxcbiAgICB0c2NvbmZpZ1BhdGhzKCksXG4gIF0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtWixTQUFTLGNBQWMsYUFBYTtBQUN2YixPQUFPLG1CQUFtQjtBQUMxQixTQUFTLG9CQUFvQjtBQVM3QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLE1BQ0osY0FBYyxRQUFRLElBQUksaUJBQWlCO0FBQUE7QUFBQSxNQUczQyxtQkFBbUIsQ0FBQyxVQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFLOUIsUUFBUTtBQUFBLFFBQ04sbUJBQW1CO0FBQUEsUUFDbkIsc0JBQXNCO0FBQUEsUUFDdEIscUJBQXFCO0FBQUEsUUFDckIsZ0JBQWdCO0FBQUEsUUFDaEIsdUJBQXVCO0FBQUEsTUFDekI7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELGNBQWM7QUFBQSxFQUNoQjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
