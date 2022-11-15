---
layout: post
title: "Starting stock Auto Trading(2) "
subtitle: "Set Up for Auto Trading tools "
background: '/img/posts/stock/stock.jpg'
# background: ![IMdb Page](\img\posts\strategy\Sport-Soccer-Football-Formation-3-2-5-WM.png) 
# background: url('\img\posts\strategy\first.jpg')
---

## Creon
먼저 대신증권에 계좌개설을 한뒤, 나의 계좌와 python기반의 소스코드 매매가 연결되어야 한다.
그러기 위해서는 대신증권에서 제공하는 api를 나의 개발환경과 연결시키는게 필요하다. 

## Creon Connecting 
objCpCybos = win32com.client.Dispatch("CpUtil.CpCybos")
bConnect = objCpCybos.IsConnect
if (bConnect == 0):
    print("PLUS가 정상적으로 연결되지 않음. ")
    exit()

나의 계좌와 대신증권의 서버와 통신하는 코드가 위와 같이 먼저 실행되어야 한다.



## Creon Objects
대신증권 서버와 통신하며 필요한 데이터들을 얻기위해서는 대신증권이 제공하는 object들을 이용하여
값을 받아오거나 보내야한다. 아래와 같은 필요한 object들을 대신증권에서 받아서 실행한다. 
<크레온 플러스 공통 OBJECT>
```pthon
cpCodeMgr = win32com.client.Dispatch('CpUtil.CpStockCode')
cpStatus = win32com.client.Dispatch('CpUtil.CpCybos')
cpTradeUtil = win32com.client.Dispatch('CpTrade.CpTdUtil')
cpStock = win32com.client.Dispatch('DsCbo1.StockMst')
cpOhlc = win32com.client.Dispatch('CpSysDib.StockChart')
cpBalance = win32com.client.Dispatch('CpTrade.CpTd6033')
```


## My Account initialize
주식 매매를 하기위해서는 내 계좌의 가지고있는 주식 및 수량, 금액등을 알아야함으로 
내 계좌를 살펴보는 함수가 필요하다.




```python
def get_stock_balance(code):
    if code == 'ALL':
        dbgout('계좌명: ' + str(cpBalance.GetHeaderValue(0)))
        dbgout('결제잔고수량 : ' + str(cpBalance.GetHeaderValue(1)))
        dbgout('평가금액: ' + str(cpBalance.GetHeaderValue(3))) #예수금
        dbgout('평가손익: ' + str(cpBalance.GetHeaderValue(4)))
        dbgout('종목수: ' + str(cpBalance.GetHeaderValue(7)))
```

위와 같은 코드로 내 계좌 balancing 코드를 작성하였다. 

## Buy, Sell 
내가 사고자하는 혹은 팔고자하는 주식을 매매하기 위해서는 buy, sell에 대한 코드작성이 필요하다.
나는 메인함수에서 buy, sell함수를 호출하여 사용하는 방법으로 진행하였으며, 

```python
def buy_etf(code):
    if ask_price > 0:  # 매수호가가 존재하면   
            buy_qty = buy_amount // ask_price  
        stock_name, stock_qty = get_stock_balance(code)  # 종목명과 보유수량 조회
        printlog(stock_name + '(' + str(code) + ') ' + str(buy_qty) +
            'EA : ' + str(current_price) + ' meets the buy condition!`')            
        #cpTradeUtil.TradeInit()
        cpTradeUtil.TradeInit(1)
        acc = cpTradeUtil.AccountNumber[1]      # 계좌번호, 복수계좌번호 선택
        #acc = cpTradeUtil.AccountNumber[0]      # 계좌번호
        accFlag = cpTradeUtil.GoodsList(acc, 1) # -1:전체,1:주식,2:선물/옵션            

def sell_all():
      while True:    
            stocks = get_stock_balance('ALL') 
            total_qty = 0 
            for s in stocks:
                total_qty += s['qty'] 
            if total_qty == 0:
                return True
            for s in stocks:
                if s['qty'] != 0:                  
                    cpOrder.SetInputValue(0, "1")         # 1:매도, 2:매수
                    cpOrder.SetInputValue(1, acc)         # 계좌번호
                    cpOrder.SetInputValue(2, accFlag[0])  # 주식상품 중 첫번째
                    cpOrder.SetInputValue(3, s['code'])   # 종목코드
                    cpOrder.SetInputValue(4, s['qty'])    # 매도수량
                    cpOrder.SetInputValue(7, "0")   # 조건 0:기본, 1:IOC, 2:FOK
                    cpOrder.SetInputValue(8, "13")  # 호가 12:최유리, 13:최우선 
                    # 최유리 IOC 매도 주문 요청
                    ret = cpOrder.BlockRequest()
                    printlog('매도', s['code'], s['name'], s['qty'], 
                        '-> cpOrder.BlockRequest() -> returned', ret)
 ```

위와 같이 buy, sell에 대한 함수를 완료하였다. 
(코드가 길어서 적당히 자름).

## main function 
나는 일정 시간에 나의 전략을 조회해서, 포착되는 종목들을 매수하였고, 
일괄 다음 지정시간에 주식을 매도하였다.
따라서 메인함수에는 시간별 실행해야하는 코드들을 삽입하였고, 시간에 따라
주식을 매수 매도 하였다.
