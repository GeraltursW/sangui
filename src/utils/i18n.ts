import { createI18n } from 'vue-i18n'
import en from './en.ts'
import cn from './cn.ts'

const message = {
  cn: cn,
  en: en,
}

const i18n = createI18n({
  locale: 'cn', // 设置语言类型
  legacy: false, // 如果要支持compositionAPI，此项必须设置为false;
  globalInjection: true, // 全局注册$t方法
  messages: message,
})

export default i18n
