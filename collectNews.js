import Parser from "rss-parser"
import fs from "fs"

const parser = new Parser()

const feeds = [
 "https://news.google.com/rss/search?q=파르나스호텔&hl=ko&gl=KR&ceid=KR:ko",
 "https://news.google.com/rss/search?q=신라호텔&hl=ko&gl=KR&ceid=KR:ko",
 "https://news.google.com/rss/search?q=롯데호텔&hl=ko&gl=KR&ceid=KR:ko",
 "https://news.google.com/rss/search?q=호텔 산업 관광&hl=ko&gl=KR&ceid=KR:ko"
]

async function run(){

 let news=[]
 let seen=new Set()

 const threeDaysAgo = new Date()
 threeDaysAgo.setDate(threeDaysAgo.getDate()-3)

 for(const url of feeds){

  const feed = await parser.parseURL(url)

  feed.items.forEach(item=>{

   const date = new Date(item.pubDate)

   if(date < threeDaysAgo) return

   if(seen.has(item.title)) return
   seen.add(item.title)

   news.push({
    title:item.title,
    source:item.source?.title || "",
    date:item.pubDate,
    url:item.link
   })

  })

 }

 fs.writeFileSync(
  "news_raw.json",
  JSON.stringify({news},null,2)
 )

}

run()
