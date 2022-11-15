---
layout: post
title: "StockAutoTrading(4):backtesting "
subtitle: "Set Up for Auto Trading Creon and My Acccount "
background: '/img/posts/stock/stock.jpg'
# background: ![IMdb Page](\img\posts\strategy\Sport-Soccer-Football-Formation-3-2-5-WM.png) 
# background: url('\img\posts\strategy\first.jpg')
---


## 연속조회 제한을 위한 변수 설정
```python
cpTimeChecker = CpTimeChecker.CpTimeChecker(1)
```

## 전종목 코드 갖고오기
```python
cpstockcode = win32com.client.Dispatch("CpUtil.CpStockCode")
num_stock = cpstockcode.GetCount()    # 전체 stock 

```

## 백테스팅
백테스팅을 위해서 DB가 필요했다. 손쉽게 익힐수 있는 mssql을 선택했다. 파이썬은 쉽게 DB언어와 호환이 되기때문에
사용하기 편리했다. 아래 코드는 나의 sql db를 연결하는 코드이다. 

```python
from sqlalchemy import create_engine
engine = create_engine("mssql+pyodbc://DESKTOP-44KKISL/stock?driver=SQL+Server", echo=False)
engine.connect()
```

## 크레온으로부터 데이터 받기
```python
for istock in range(0, num_stock):
    stockcode = cpstockcode.GetData(0, istock)  # 종목 코드
    print(stockcode, '다운로드 시작' , istock, '/', num_stock)
    # 기존에 이 종목이 디비에 존재하면 전부 지우고 시작한다
    engine.execute("delete from [stock].dbo.LogDay where stockcode=\'{}\'".format(stockcode))
 
    # 차트 데이터 받아오기
    cpStockChart = win32com.client.Dispatch("CpSysDib.StockChart")
    cpStockChart.SetInputValue(0, stockcode)
    cpStockChart.SetInputValue(1, ord('1'))  
    cpStockChart.SetInputValue(2, 20220428)
    cpStockChart.SetInputValue(3, 20200101) # 기간 정하기
    cpStockChart.SetInputValue(4, 10000000)
    cpStockChart.SetInputValue(5, (0, 2, 3, 4, 5, 6, 8, 9, 13, 20, 21, 37))
    cpStockChart.SetInputValue(6, ord('D'))
    cpStockChart.SetInputValue(9, ord('1'))
    cpStockChart.BlockRequest()
    numData = cpStockChart.GetHeaderValue(3)  # 다운로드된 데이터 행 갯수
    
    response_dates = []
    response_opens = []
    response_highs = []
    response_lows = []
    response_closes = []
    response_vols = []
    response_chgs = []
    response_marketcap = []
    response_instnetbuy = []
    response_instcumbuy = []
    response_money = []
    
```

## Mssql DB 데이터 쌓기
위 코드로부터 받은 일봉데이터를 Mssql DB로 쌓아서 내가 원하는 전략을 찾기위한 백테스팅 준비를 마쳤다.
