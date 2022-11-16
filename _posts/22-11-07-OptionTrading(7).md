---
layout: post
title: "Option Trading (7) "
subtitle: "Strategy of Option"
background: '/img/posts/Option/option2.jpg'
# background: ![IMdb Page](\img\posts\strategy\Sport-Soccer-Football-Formation-3-2-5-WM.png) 
# background: url('\img\posts\strategy\first.jpg')
---

## 위험관리 (옵션 매도)
- 콜매도 & 풋매도 : 제한된 수익, 무한손실.
- 콜매수 & 풋매수 : 제한된 손실, 무한수익.

위험을 최대한 피하기 위해서 기초자산의 변동성이 확대되어 옵션 프리미엄이 고평가 되었을때 추세에 편승하여 포지션 진입하는 것이 중요
만약 1포인트에 진입했다면 9/11테러시 5배 손실만 발생
원유 폭락에 따른 풋옵션 프리미엄 급등. 0.03포인트에 매도했다면 손실 142배
변동성 확대후 0.8포인트에 진입했다면 손실은 5배로 제한.

변동성으로 인해 옵션 프리미엄이 급등한해도 변동성이 확대된 상태에서 포지션에 진입한다면 손실의 정도는 이론적으로 상당히 낮아짐
외가격 옵션 매도후 더 오르는 추세일경우, 외가격 옵션을 매수하여 리스크 헷지
매도에서 발생한 $3,900 손실을 $3,280 수익으로 손실 방지.

최대 손실 70-95포인트 = -25포인트 = -$2,500
최대수익 56-37 포인트 = 19포인트 = $1,900
합성포지션은 콜옵션 매도 포지션을 진입하면서 받은 옵션 프리이머의 일부를 콜 옵션 매수포지션을 진입하는데 지불함으로써 보험을 파는것과 동시에 재보험에 가입하는 구조를 갖게 됨.

지금까지 방법대로 만기가 긴 차차 월물옵션에 대입하여 거래한다면 좀더 보수적으로 위험관리가 가능 반면 만기가 긴 차차 월물 옵션들은 옵션 프리미엄이 고평가 되었을때 매도 포지션을 진입한다면 만기가 짧은 근월물 옵션보다 변동성에 덜 민감하기 때문에 수익이 상대적으로 느리게 발생하는 만큼 손실또한 둔감하게 발생되어 몇 년에 한번씩 발생하는 예측할수 없는 큰 변동성이 발생했을 때 근월물 옵션보다 위험을 상대적으로 낮출 수 있어 보다 효과적인 위험관리를 할 수 있게 됨.

가장 이상적인 매매를 할 수 있는 매매 조건에 부합되는 기회들을 찾아내기 위해서는 최대한 많은 거래 대상을 두고 매매하는 것이 거래 대상이 적은 것보다 상대적으로 더 많은 기회를 찾아낼수 있으며, 위험관리 또한 좀더 효율적으로 할 수 있음
코로나때 사우디 석유 증산발표시, 풋옵션 근월물 옵션 프리미엄 92배 상승한 반면 차차월물은 5.5배만 상승 ***단, 차차월물은 승률이 낮을수 있고, 합성포지션 구축시 수익률도 감소하므로 잘 판단해야 함. 거래대상이 많으면 서로 상쇄되면서 자연스럽게 위험관리됨.***
## 증거금 관리
-	대부분 옵션 매도 포지션을 진입하기 위해 필요로하는 증거금을 옵션 매도 포지션의 단점으로 보는이들이 많음. 하지만 레버리지가 높은 옵션 시장에서 높은 증거금은 과도한 매매를 하지 못하게 막는 1차 안정망임. 만약 증권사에서 증거금을 높인다면 그만큼 시장의 변동성과 위험도가 높아졌다는 뜻이기 때문에 기대 수익률이 낮아지더라도 높은 증거금에 맞춰 매매비중을 조정하는것이 현명함.
-	매매시 증거금은 총 예탁금 대비 최대 60%~80% 수준을 유지하는 것이 중요
-	증거금을 관리하지 않고 과도한 계약수로 매매를 하다 보면 기초자산의 가격이 손실방향으로 움직여 총 예탁금이 유지 증거금을 하회하게 되는 상황이 발생할수 있음
-	이때 포지션에서 발생하는 손실이 손절가격에 도달하지 않았음에도 불구하고, 강제 청산된다면 수익전환 될수 있었던 포지션이 손실로 청산되는 낭패를 보는 경우가 발생할 수 있음. 따라서 증거금 관리에 주의를 기울여야 함.