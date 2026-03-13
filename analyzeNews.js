import fs from "fs"
import OpenAI from "openai"

const openai = new OpenAI({
 apiKey: process.env.OPENAI_API_KEY
})

const raw = JSON.parse(fs.readFileSync("news_raw.json"))

async function run(){

 const prompt = `
다음 뉴스 리스트를 분석해서 JSON으로 정리해줘.

작업:
1. 오늘 주요 키워드 3~5개 생성
2. 각 뉴스 3줄 요약
3. 파르나스 / 경쟁사 / 산업 뉴스 분류

출력 JSON 구조:

{
 "keywords":[],
 "parnas_news":[],
 "competitor_news":[],
 "industry_news":[]
}

뉴스 데이터:
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
