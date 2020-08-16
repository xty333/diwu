
			//获取购物车按钮
            var oBuy = document.getElementById("buy");
			//获取所有的购买按钮
			initCart();
            const oAddCart = document.querySelector('#add');
            console.log(oAddCart)
			//给购物车按钮添加点击事件
			oBuy.onclick = function(){
				location.href = "http://127.0.0.1:5500/five_Product/src/html/carts.html";
			}
			//给所有的购买按钮添加点击事件
				oAddCart.onclick = function(){
					//获取商品id
                    let goodId = this.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('data-good-id');
                    console.log(goodId)
					//获取商品名称
					let goodName = this.parentNode.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.nextElementSibling.innerHTML;
					//获取商品价格
					let goodPrice = parseInt(this.parentNode.parentNode.parentNode.parentNode.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.innerHTML);
					//获取商品的图片src
					let goodSrc = this.parentNode.parentNode.parentNode.parentNode.previousElementSibling.firstElementChild.firstElementChild.firstElementChild.src;
				
					//获取localStorage
					let storage = window.localStorage;
					let cartStr = storage.wdd_cart ? storage.wdd_cart : '';
					let cartObj = convertJsonStrToJsonObj(cartStr);
					if(goodId in cartObj){
						cartObj[goodId].num ++;
					}else{
						cartObj[goodId] = {
							"id" : goodId,
							"name" : goodName,
							"price" : goodPrice,
							"src" : goodSrc,
							"num" : 1
						}
					}
					storage.wdd_cart = JSON.stringify(cartObj);
					//取出购物车中的数量
					let re = /(\d+)/;
					let str = oBuy.textContent;
					let num = parseInt(re.exec(str)[1]);
					oBuy.textContent= num + 1;
				}
			
			function initCart(){
				let storage = window.localStorage;
				let cartStr = storage.wdd_cart ? storage.wdd_cart: '';
				let cartObj = convertJsonStrToJsonObj(cartStr);
				let sum = 0;
				for(let key in cartObj){
					sum += cartObj[key].num;
				}
				oBuy.textContent = sum;
			}
			function convertJsonStrToJsonObj(str){
				if(!str){
					return {};
				}
				return JSON.parse(str);
			}
	