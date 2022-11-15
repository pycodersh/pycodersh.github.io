---
layout: post
title: "StockAutoTrading(5):Mssql "
subtitle: "Mssql DB"
background: '/img/posts/stock/stock.jpg'
# background: ![IMdb Page](\img\posts\strategy\Sport-Soccer-Football-Formation-3-2-5-WM.png) 
# background: url('\img\posts\strategy\first.jpg')
---

## 백테스팅 전략
나의 전략은 현재로부터 10일, 15일, 20일 전의 amount, volume의 평균값보다 큰 종목만 추출하는 것이었다.
아래는 나의 전략을 수행하는 DB쿼리의 일부이다.

```sql
while @START_DATE <= @END_DATE
	begin
		--10일전 amount/volume 평균
		update m4
		set m4.amounta = m3.avg_amount
		from stock.dbo.LogDay m4 join
		(
			select stockcode, logdate, priceClose, volume, amount
			, ( 
				select avg(case when logdate between big_b.beforedate and @START_DATE then amount end)
				from 
				(
					select stockcode, logdate, priceClose, volume, amount,
					( 
						select logdate 
						from stock.dbo.logday m1 
						where m1.stockcode = m2.stockcode and m1.logdate <=  @START_DATE order by logdate desc offset 9 rows fetch next 1 rows only
					) beforedate
				from stock.dbo.logday m2
				)big_b
				where big_b.stockcode = big_t.stockcode and logdate between big_b.beforedate and @START_DATE 
			)avg_amount
			from 
				(
					select stockcode, logdate, priceClose, volume, amount,
					( 
						select logdate 
						from stock.dbo.logday m1 
						where m1.stockcode = m2.stockcode and m1.logdate <=  @START_DATE order by logdate desc offset 9 rows fetch next 1 rows only
					) beforedate
				from stock.dbo.logday m2
				)big_t
			where logdate between beforedate and @START_DATE
		)m3
		on m4.stockcode = m3.stockcode and m4.logdate = m3.logdate and m4.logdate = @START_DATE
```

이런식으로 10일, 15일, 20일의 amount, volume 평균값을 구해서 DB에 저장하였다.


