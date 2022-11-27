# TODO

## Feature

- [x] mode: 單選、多選(跨月份怎麼辦)、range
- [x] disabled 日期
- [x] view 模式: 日曆、年、十年、百年
- [ ] 考慮時區問題
- [ ] 禁止 1970 以前
- [ ] 滾輪事件去切換日曆 (https://vuetifyjs.com/en/components/date-pickers/#colors)
- [ ] __DEV__ 去顯示開發 log
- [ ] 穩定顯示固定每月份的天數

## Bug

- [ ] 修正每個日期的 value 應顯示 23:59:59，因未 disableDate: date.now < Date.now() 會包含到今天
- [ ] InRange 的初始 selected 如果是 useState([new Date(), new Date()]) 無法顯示狀態，因為 date 的 value 設定關係
- [ ] range 的 disabled date 若是跳著會怪怪的，選取的時候跨到 disabled date 會怪怪的
- [ ] 月份應綁定該年份，避免跨度太大，產生別的年份選的月，在本年的月份，顯示 selected

## React 問題

- 抓取 dom
- 生命週期
- 使用 eventlistener
- inject provide
