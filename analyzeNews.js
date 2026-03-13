import fs from "fs"
import OpenAI from "openai"

const openai = new OpenAI({
 apiKey: process.env.OPENAI_API_KEY
})

const raw = JSON.parse(fs.readFileSync("news_raw.json"))

async function run(){

 const prompt = `
호텔 산업 뉴스 분석을 수행해라.

규칙:

1. 파르나스 관련 뉴스
   - 파르나스
   - 인터컨티넨탈 서울 파르나스
   - 웨스틴 파르나스
   - 파르나스호텔

2. 경쟁사 뉴스
   - 신라호텔
   - 롯데호텔
   - 파라다이스
   - 워커힐
   - 조선호텔
   - 아난티

3. 산업 뉴스
   - 관광
   - 호텔 산업
   - 인바운드
   - 관광 정책
   - 호텔 투자
   - 관광객

출력 JSON 구조

{
 "keywords":[],
 "parnas_news":[],
 "competitor_news":[],
 "industry_news":[]
}

각 뉴스는

{
 "title":"",
 "date":"",
 "url":"",
 "summary":[
   "요약1",
   "요약2",
   "요약3"
 ]
}

뉴스 리스트

${JSON.stringify(raw.news)}
`

 const response = await openai.chat.completions.create({
   model:"gpt-4.1-mini",
   messages:[
     {role:"user",content:prompt}
   ]
 })

 fs.writeFileSync("news.json",response.choices[0].message.content)

}

run()
