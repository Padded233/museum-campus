'use strict';
const courseImageWidths=[578, 450, 292, 900, 900, 450];
const courses=[
{label:'综合类 · 毛志琼',title:'认识河南博物院的藏品',description:'观察贾湖骨笛、云纹铜禁和莲鹤方壶，从外形与用途进入文物的故事。',task:'课堂任务：观察器物 → 了解用途 → 国宝知识问答'},
{label:'遗址类 · 张心俞',title:'把文物放回遗址中观察',description:'结合遗址与考古发现，认识文物的出土环境，以及它们与历史生活的联系。',task:'课程线索：遗址背景 → 考古发现 → 历史联系'},
{label:'民族民俗类 · 石俊佳',title:'从日常生活认识传统文化',description:'从服饰、生活习俗和传统文化内容出发，了解日常生活怎样成为博物馆的展示对象。',task:'课程线索：生活物品 → 传统习俗 → 文化表达'},
{label:'自然科技类 · 石俊佳',title:'在博物馆里认识自然与科学',description:'以河南省科技馆、嵩山地质公园博物馆和黄河博物馆等案例，把视野延伸到地质与自然现象。',task:'课程线索：自然现象 → 场馆案例 → 科学知识'},
{label:'纪念类 · 郭宇恒',title:'沿着一处地点了解一段历史',description:'以二七纪念塔及相关历史为线索，借助地点和事件的联系认识纪念类博物馆。',task:'课程线索：纪念地点 → 历史事件 → 记忆与传承'},
{label:'专题类 · 李泓源',title:'从甲骨文字形开始辨认',description:'围绕文字、陶瓷、电影和戏曲等专题展开；文字主题把载体演变与日、月、山、水、人等辨识任务联系起来。',task:'课堂任务：观察字形 → 联系汉字 → 摹写与表达'}
];
document.querySelectorAll('[data-course]').forEach(button=>button.addEventListener('click',()=>{
const i=Number(button.dataset.course),c=courses[i];
document.querySelectorAll('[data-course]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
for(const [id,value] of [['course-label',c.label],['course-title',c.title],['course-description',c.description],['course-task',c.task]])document.getElementById(id).textContent=value;
const img=document.getElementById('course-image');img.srcset=[400,640].filter(w=>w<courseImageWidths[i]).map(w=>`media/course-${i}-${w}.webp ${w}w`).concat(`media/course-${i}.webp ${courseImageWidths[i]}w`).join(", ");img.src=`media/course-${i}.webp`;img.alt=`项目${c.label.split(' · ')[0]}课件中的原图`;
}));
const surveys=[
{scope:'四至七年级 · 284份扫描问卷',stat:'63.24%',n:'172 / 272名有效作答者',title:'学生希望了解什么',meta:'多选题 · 有效作答276人 · 前四项',bars:[['青铜器、瓷器、玉器等文物','47.83%'],['河南历史故事','46.38%'],['恐龙／古生物化石','42.75%'],['红色革命历史','41.30%']],source:'来源：第一次调查报告第10、14页；V6报告表1。'},
{scope:'三至六年级 · 381份扫描问卷',stat:'39.38%',n:'128 / 325名有效作答者',title:'学生喜欢什么活动形式',meta:'多选题 · 有效作答335人 · 前四项',bars:[['非遗文化体验','58.81%'],['文物和历史故事','31.64%'],['短视频','23.88%'],['模拟小小讲解员','7.46%']],source:'来源：第二次调查报告第9、13页；V6报告表2。'}
];
document.querySelectorAll('[data-round]').forEach(button=>button.addEventListener('click',()=>{
const i=Number(button.dataset.round),s=surveys[i];document.querySelectorAll('[data-round]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
for(const [id,value]of[['survey-scope',s.scope],['survey-stat',s.stat],['survey-denominator',s.n],['survey-detail-title',s.title],['survey-detail-meta',s.meta],['survey-source',s.source]])document.getElementById(id).textContent=value;
document.getElementById('survey-bar').style.width=s.stat;document.querySelector('.survey-track').setAttribute('aria-label',`${i===0?'第一':'第二'}批调查中${s.stat}的有效作答者从未到馆参观`);
const ul=document.getElementById('survey-details');ul.replaceChildren();s.bars.forEach(([label,value])=>{const li=document.createElement('li'),row=document.createElement('div'),name=document.createElement('span'),num=document.createElement('span'),track=document.createElement('div'),bar=document.createElement('span');name.textContent=label;num.textContent=value;row.append(name,num);track.className='data-track';bar.style.width=value;track.append(bar);li.append(row,track);ul.append(li)});
document.querySelector('.survey-feedback').textContent=`已显示${i===0?'第一':'第二'}批调查。多选题各项比例可以重叠。`;
}));
const quiz=[
{q:'下面哪一项属于博物馆的基本功能？',answers:['收藏、教育与研究','只保存贵重物品','只供专业人员参观'],correct:0,explanation:'基础课件介绍收藏、教育与研究等功能。博物馆保存物证，也通过展示和讲解帮助公众学习。'},
{q:'甲骨文辨识活动，首先需要做什么？',answers:['只记住文物价格','观察字形，联系已学汉字','直接跳过图形'],correct:1,explanation:'专题课件安排日、月、山、水、人等字的辨识。先观察形态，再联系已有知识作出判断。'},
{q:'看懂一件陌生文物，可以先从哪里入手？',answers:['认定外形奇怪就没有用途','只看它是否闪亮','观察外形，并了解用途和背景'],correct:2,explanation:'项目课件把外形、用途与背景联系起来。文物名称之外，观察细节和了解生活背景同样有帮助。'}
];
let qi=0,answered=false,score=0;const options=document.getElementById('quiz-options'),feedback=document.getElementById('quiz-feedback'),next=document.getElementById('quiz-next');
options.addEventListener('click',e=>{const b=e.target.closest('[data-answer]');if(!b||answered)return;answered=true;const correct=Number(b.dataset.answer)===quiz[qi].correct;if(correct)score++;options.querySelectorAll('button').forEach(x=>{x.setAttribute('aria-pressed',String(x===b));x.disabled=true});feedback.textContent=(correct?'答对了。':'再记住这个知识点。')+quiz[qi].explanation;next.disabled=false;next.textContent=qi===2?'查看答题结果':'回答下一题';});
next.addEventListener('click',()=>{if(!answered)return;if(qi===2){document.getElementById('quiz-question').textContent=`完成了，答对 ${score} / 3 题`;document.getElementById('quiz-progress').textContent='课堂知识自测完成';options.hidden=true;feedback.textContent='回到课程里，再挑选一件感兴趣的文物，试着向同学说说它的外形、用途和故事。';next.textContent='重新答题';qi=3;return}if(qi===3){qi=0;score=0}else qi++;answered=false;options.hidden=false;document.getElementById('quiz-progress').textContent=`第${qi+1}题 / 共3题`;document.getElementById('quiz-question').textContent=quiz[qi].q;options.replaceChildren();quiz[qi].answers.forEach((text,i)=>{const b=document.createElement('button');b.type='button';b.className='btn btn--secondary';b.dataset.answer=i;b.textContent=text;options.append(b)});feedback.textContent='选好后会显示知识解释。';next.disabled=true;next.textContent='回答后继续';document.getElementById('quiz-question').setAttribute('tabindex','-1');document.getElementById('quiz-question').focus({preventScroll:true});});
