---
layout: post
title: "Starting stock Auto Trading(6) "
subtitle: "Finding My Strategy and protocol "
background: '/img/posts/stock/stock.jpg'
# background: ![IMdb Page](\img\posts\strategy\Sport-Soccer-Football-Formation-3-2-5-WM.png) 
# background: url('\img\posts\strategy\first.jpg')
---

## 이격도
나의 전략을 수립하기 위해서는 이격도가 필요했다. 따라서 DB에 저장한 10일, 15일, 20일 volume, amount의 값을 통해 
이격도를 구해야 했다.


## DB 쿼리 
크레온에서 제공하는 주식 전체에 대한 정보를 받아 DB에서 쿼리를 돌리며 계산을 하였다. 
내가 원하는 평균값만 쿼리에 넣는것도 최대 하루이상 쿼리를 돌려야하는 로직도 있었다.
한번 DB에 잘못된 쿼리를 돌렸다가 눈물을 머금고... 데이터를 삭제하기도 했다.

## 백테스팅, 자동매매
1. DB Set up 
- Mssql을 깔고, 나의 stock.db를 만들었다.
- stock.db 와 spyder는 언어가 호환이 되므로 쉽게 연결이 된다.

2. spyder
나는 크레온과 통신을 하면서 주식 매매를 하는 것은 spyder환경에서 실행하였다. 
백테스팅을 통해 그래프 추출또한 spyder에서 실행하였다. 
spyder의 사용 목적은 아래와 같이 두가지였다. 
- 크레온 매매 
- 백테스팅 결과 추출 

3. Backtesting
내가 원하는 전략을 찾기 위해서는 mssql에 쌓은 주식 데이터를 통한 백테스팅이 필요했다. 
우선 mssql에 주식 데이터를 쌓았다. 
전체 주식종목에 대한 일봉, 분봉 정보를 크레온으로 부터 받아서 mssql에 넣었다. 
- date, stock, priceOpen, priceClose, priceHigh, priceLow, volume, amount의 정보를 받았다. 
- 위 데이터를 통하여 10일, 15일, 20일 평균값을 계산했다. 
- 이격도 및 전일종가 등의 정보를 비교하여 나의 전략을 찾아 종목 추출을 하였다. 

4. Graph
나의 전략에 맞는 종목을 추출한 뒤 이 종목을 원하는 시간에 사고 팔았을때 얼마나 이익이 나는지 확인이 필요했다.
수익률, 누적수익률 등을 계산하여 그래프를 추출하였다.

