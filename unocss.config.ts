import presetWeapp from 'unocss-preset-weapp'
import { transformerAttributify, transformerClass } from 'unocss-preset-weapp/transformer'
import { defineConfig } from 'unocss'

const prefix = 'g_'

export default defineConfig({
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp({
      prefix
    })
  ],
  transformers: [
    transformerAttributify({
      nonValuedAttribute: true,
      classPrefix: prefix
    }),

    transformerClass()
  ],
  shortcuts: [
    {
      'g_border-base': 'g_border g_border-gray-500_10',
      g_center: 'g_flex g_justify-center g_items-center',
      'g_flex-l': 'g_flex g_justify-start g_items-center',
      'g_flex-r': 'g_flex g_justify-end g_items-center',
      'g_color-p': 'g_color-#ff5e52',
      'g_color-s': 'g_color-#ff6e63',
      'g_gradient-b': 'g_bg-gradient-to-b g_from-#017A5E g_to-transparent',
      'g_gradient-t': 'g_bg-gradient-to-t g_from-#017A5E g_to-transparent',
      'g_gradient-l': 'g_bg-gradient-to-l g_from-#017A5E g_to-transparent',
      'g_gradient-r': 'g_bg-gradient-to-r g_from-#017A5E g_to-transparent',
      'g_gradient-btn': 'g_bg-gradient-to-r g_from-#017A5E g_to-#1B9E80',
      g_btn: 'g_h-76 g_rounded-12rpx g_text-36 g_leading-76rpx g_text-center',
      'g_btn-s':
        'g_min-w-70rpx g_px-16rpx g_h-44 g_rounded-8rpx g_text-24 g_leading-44rpx g_text-center ',
      'g_btn-ss':
        'g_min-w-70rpx g_px-20rpx g_h-46 g_rounded-8rpx g_text-26 g_leading-46rpx g_text-center ',
      'g_btn-sm':
        'g_min-w-80rpx g_px-20rpx g_h-54 g_rounded-8rpx g_text-26 g_leading-54rpx g_text-center ',
      'g_btn-m': 'g_px-23rpx g_h-70 g_rounded-12rpx g_text-32 g_leading-70rpx g_text-center',
      'g_btn-danger': 'g_bg-#FEEFEF g_text-#D53F3F',
      'g_btn-warn': 'g_bg-#FEF6E9 g_text-#F58F0B',
      'g_btn-grey': 'g_bg-#eee g_text-#666',
      'g_btn-done': 'g_bg-#EAF9E8 g_text-#289C1F',
      'g_btn-primary': 'g_gradient-btn g_text-white',
      'g_btn-border': 'g_border-2rpx g_border-solid',
      'g_btn-danger-b': 'g_btn-border g_btn-danger g_border-#D53F3F',
      'g_btn-warn-b': 'g_btn-border g_btn-warn g_border-#F58F0B',
      'g_btn-grey-b': 'g_btn-border g_btn-grey g_border-#666',
      'g_btn-done-b': 'g_btn-border g_btn-done g_border-#289C1F',
      'g_btn-danger-p': 'g_btn-border g_text-#D53F3F g_border-#D53F3F',
      'g_btn-warn-p': 'g_btn-border g_text-#F58F0B g_border-#F58F0B',
      'g_btn-plain': ' g_btn-border g_border-#ff5e52 g_text-#ff6e63',
      'g_btn-normal': 'g_btn-border g_border-#ccc',
      'g_tab-active': 'g_font-bold g_bg-gradient-to-t g_from-#CDE4D9 g_to-#EEFAF5  g_color-p',
      'g_tab-0': 'g_rounded-37rpx g_bg-#A9D5BF g_text-white',
      'g_tab-1': 'g_text-#666 g_rounded-15rpx g_bg-#E7F6EE',
      g_divider: 'g_border-b-1px g_border-b-solid g_border-b-#ddd'
    }
  ],
  safelist: [
    'g_tab-0',
    'g_tab-1',
    'g_border-base',
    'g_center',
    'g_flex-l',
    'g_flex-r',
    'g_color-p',
    'g_color-s',
    'g_gradient-b',
    'g_gradient-t',
    'g_gradient-l',
    'g_gradient-r',
    'g_gradient-btn',
    'g_btn',
    'g_btn-s',
    'g_btn-ss',
    'g_btn-sm',
    'g_btn-m',
    'g_btn-danger',
    'g_btn-warn',
    'g_btn-grey',
    'g_btn-done',
    'g_btn-primary',
    'g_btn-border',
    'g_btn-danger-b',
    'g_btn-warn-b',
    'g_btn-grey-b',
    'g_btn-done-b',
    'g_btn-warn-p',
    'g_btn-danger-p',
    'g_btn-plain',
    'g_btn-normal',
    'g_tab-active'
  ]
})
