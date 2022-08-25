import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.caesar.sola',
  appName: 'sola',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000, // 启用自动隐藏时显示启动闪屏的时间（以毫秒为单位）
      launchAutoHide: true, // 是否在 launchShowDuration 后自动隐藏启动画面
      backgroundColor: '#ffffff', // 初始屏幕背景颜色
      androidSplashResourceName: 'splash', // 启动画面的资源名称
      androidScaleType: 'CENTER_CROP', // 缩放启动画面图像
      showSpinner: true, // 初始屏幕上显示加载微调器
      androidSpinnerStyle: 'large', // Android 微调器的样式
      iosSpinnerStyle: 'small', // IOS 微调器的样式
      spinnerColor: '#999999', // 十六进制格式的微调器颜色
      splashFullScreen: true, // 隐藏启动画面上的状态栏
      splashImmersive: true, // 隐藏启动画面上的状态栏和软件导航按钮
      layoutName: 'launch_screen',
      useDialog: true
    }
  }
}

export default config
