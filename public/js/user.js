angular.module('userController', ['testService.services'])
.controller('user', function($scope,$http,$routeParams,$location,$localStorage,$interval,API)
{

	$scope.show_id   = 0;
	$scope.show_cust = false;;
	$scope.offer_history =[];
	$scope.state =[];
	$scope.states = [];
	$scope.user_details = [];
	$scope.search_type  = "distance";
	$scope.search_by_merchant_tag = 'name';
	if(localStorage.getItem('char_message') != 'undefined' && localStorage.getItem('char_message') != null)
	{
		$scope.chat_details = JSON.parse(localStorage.getItem('char_message'));
	}
	$(".messages").scrollTop($(".messages")[0].scrollHeight);
	var socket = io.connect();
	
	$scope.send_to_customer = $scope.csr_id+$routeParams.userId;
	
	var stop = $interval(function() {
		console.log("clear all data");
	}, 300000);

	if(localStorage.getItem('csr_name') != 'undefined' && localStorage.getItem('csr_name') != null)
	{
		$scope.csr_id 	= JSON.parse(localStorage.getItem('csr_name'));
		socket.emit('new user',{type : "csr" , id : $scope.csr_id,"csr" : $scope.csr_id},function(data){
			if(!data.status)
			{
				alert(data.message)
			}
		});
	}
	if(localStorage.getItem('user_details') == 'undefined' || localStorage.getItem('user_details') == null)
	{
		$scope.user_details =[{
							id              : 'WE0001',
							image           : "img/user.png",
							notification    : 0,
							name            : "Mark huns" ,
							last_login      : "12 min",
							offer_history   : [{
												date : "10/3/2016",
												time : "9.30 A.M",
												offer_name : "Lorem Ipsum"
											}],
							location   		:{
												latitude : "22.573531",
												longitude : "88.433119",
											},
						},
						{
							id              : 'WE0002',
							image           : "img/user.png",
							notification    : 0,
							name            : "Bobby steave" ,
							last_login      : "8 min",
							offer_history   : [{
												date : "10/3/2016",
												time : "9.30 A.M",
												offer_name : "Lorem Ipsum"
											}],
							location   		:{
												
											},
						},
						{
							id              : 'WE0003',
							image           : "img/user.png",
							notification    : 0,
							name            : "Stephen morrey" ,
							last_login      : "5 min",
							offer_history   : [{
												date : "10/3/2016",
												time : "9.30 A.M",
												offer_name : "Lorem Ipsum"
											}],
							location   		:{
											},
						},
						{
							id              : 'WE0004',
							image           : "img/user.png",
							notification    : 0,
							name            : "Kennedy john" ,
							last_login      : "2 min",
							offer_history   : [{
												date : "10/3/2016",
												time : "9.30 A.M",
												offer_name : "Lorem Ipsum"
											}],
							location   		:{
												latitude : "22.573531",
												longitude : "88.433119",
											},
						},
						{
							id              : 'WE0005',
							ïmage           : "img/user.png",
							notification    : 0,
							name            : "Mike steven" ,
							last_login      : "1 min",
							offer_history   : [{
												date : "10/3/2016",
												time : "9.30 A.M",
												offer_name : "Lorem Ipsum"
											}],
							location   		:{
												latitude : "22.573531",
												longitude : "88.433119",
											},
						},{
							id              : 'WE0006',
							ïmage           : "img/user.png",
							notification    : 0,
							name            : "Honey lenk" ,
							last_login      : "30 min",
							offer_history   : [{
												date : "10/3/2016",
												time : "9.30 A.M",
												offer_name : "Lorem Ipsum"
											}],
							location   		:{
												latitude : "22.583046",
												longitude : "88.458598",
											},
						},{
							id              : 'WE0007',
							ïmage           : "img/user.png",
							notification    : 0,
							name            : "Peter cook" ,
							last_login      : "50 min",
							offer_history   : [{
												date : "10/3/2016",
												time : "9.30 A.M",
												offer_name : "Lorem Ipsum"
											}],
							location   		:{
												latitude : "22.568605",
												longitude : "88.432818",
											},
						}]
	}
	else
	{
		$scope.user_details = JSON.parse(localStorage.getItem('user_details'));
	}
	$scope.getCustomerOfferHistory = function(id,customer_name,location,index){
		$scope.showCustomerOffer = true;
		$scope.customer_id = id;
		$scope.positions = [];
		$scope.user_details[index].notification = 0;
		$scope.offer_history = '';
		API.getDetails("test/fetchofferhistory",{id : id}).then(function successCallback(response) {
			if(response.status == 200)
			{
				if(typeof response.data.message.details !='undefined' && response.data.message.details.length>0)
				{
					$scope.offer_history = response.data.message.details;
				}
			}
			else
			{
				// show error message
			}
			$scope.showCustomerOffer = false;
		}, function errorCallback(response) {
			$scope.showCustomerOffer = false;
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
		$scope.show_id      = id;
		$scope.show_cust    = true;
		$scope.cust         = customer_name;
		
		$scope.positions = [{lat:location.latitude,lng:location.longitude}];
		

		$scope.user_location= location;
		if(typeof location != 'undefined' && location !='')
		{
			if(typeof location.latitude !='undefined' && location.latitude !='' && location.latitude !=null )
			{
				$scope.show_user_location = 'current';
				$scope.merchant_by_location_details = '';
				$scope.location_details ={
					lat : location.latitude,
					lon : location.longitude
				};
				$scope.showSearchByDistanceLoader = true;
				API.getDetails("test/searchbydistance",$scope.location_details).then(function successCallback(response) {
					$scope.merchant_by_location_details = '';
					if(response.status == 200)
					{
						if(typeof response.data.message.details !='undefined' && response.data.message.details.length>0)
						{
							$scope.merchant_by_location_details = response.data.message.details;
						}
					}
					else
					{
						// show error message
					}
					$scope.showSearchByDistanceLoader = false;
				}, function errorCallback(response) {
					$scope.showSearchByDistanceLoader = false;
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				});
			}
			else
			{
				$scope.show_user_location = 'choosen';
			}
		}
		else
		{
			$scope.show_user_location = 'choosen';
		}


		$scope.send_to_customer =id;
		// adding new user into the socket
		$(".messages").scrollTop($(".messages")[0].scrollHeight);
	}
	$scope.getCustomerDetails = function(id,customer_name,location,index)
	{
		$scope.showCustomerLoader = true;
		$scope.customer_id = id;
		$scope.customer_details ='';
		$scope.merchant_by_location_details = '';
		API.getDetails("test/fetchprofile",{id : id}).then(function successCallback(response) {
			if(response.status == 200)
			{
				if(typeof response.data.message.details !='undefined' && response.data.message.details.length>0)
				{
					$scope.customer_details = response.data.message.details[0];
				}
			}
			else
			{
				// show error message
			}
			$scope.showCustomerLoader = false;
		}, function errorCallback(response) {
			$scope.showCustomerLoader = false;
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});


		API.getDetails("test/fetchalltag",{tag : 'di'}).then(function successCallback(response) {
			if(response.status == 200)
			{
				if(typeof response.data.message.details !='undefined' && response.data.message.details.length>0)
				{
					$scope.tags = response.data.message.details;
					API.getDetails("test/fetchtag",{id : id}).then(function successCallback(response) {
						if(response.status == 200)
						{
							if(typeof response.data.message.details !='undefined' && response.data.message.details.length>0)
							{
								$scope.tag = response.data.message.details;
							}
						}
						else
						{
							// show error message
						}
						$scope.showCustomerLoader = false;
					}, function errorCallback(response) {
						$scope.showCustomerLoader = false;
					    // called asynchronously if an error occurs
					    // or server returns response with an error status.
					});
				}
			}
			else
			{
				// show error message
			}
			$scope.showCustomerLoader = false;
		}, function errorCallback(response) {
			$scope.showCustomerLoader = false;
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
		$scope.merchant_details = '';
		API.getDetails("test/searchbymerchant",{id : id}).then(function successCallback(response) {
			if(response.status == 200)
			{
				if(typeof response.data.message.details !='undefined' && response.data.message.details.length>0)
				{
					$scope.merchant_details = response.data.message.details;
				}
			}
			else
			{
				// show error message
			}
			$scope.showCustomerLoader = false;
		}, function errorCallback(response) {
			$scope.showCustomerLoader = false;
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});



		$scope.getCustomerOfferHistory(id,customer_name,location,index);
	/*	
		if(id%2 == 0)
		{
			$scope.customer_Details ="Lorem ipsum dolor sit amet adipiscing elit ultricies. tristique tellus felis volutpat pretium.";
			//Remote items
			$http({
				method: 'get',
				url: 'http://jsonplaceholder.typicode.com/posts'
			}).success(function(posts) {
				$scope.state = [2, 3];
				//console.log(posts);
				$scope.states = posts;
			});
		}
		else
		{				
			$scope.states = [
				{id: 100, title: 'Family Dine'},
				{id: 101, title: 'Gold Card'},
				{id: 102, title: 'Free Gifts'},
				{id: 103, title: 'World Tour'},
				{id: 104, title: 'Gift Coupons'}
			];
			$scope.state = [103,100];
			$scope.customer_Details = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
		}

	*/
		$scope.search_type  = "distance";

	}
	$scope.openReadmoreModel = function(details)
	{
		$scope.user_offer_history_details = details;
	}

	$scope.searchType = function(type)
	{
		$scope.search_type  = type;
	}
	$scope.changeLocation = function(location_type)
	{
		$scope.show_user_location = location_type
	}
	$scope.getDetailsByLocation = function()
	{
		$scope.merchant_by_location_details = '';
		$scope.location_details ={
			lat : "22",
			lon : "82"
		};
		$scope.showSearchByDistanceLoader = true;
		API.getDetails("test/searchbydistance",$scope.location_details).then(function successCallback(response) {
			$scope.merchant_by_location_details = '';
			if(response.status == 200)
			{
				if(typeof response.data.message.details !='undefined' && response.data.message.details.length>0)
				{
					$scope.merchant_by_location_details = response.data.message.details;
				}
			}
			else
			{
				// show error message
			}
			$scope.showSearchByDistanceLoader = false;
		}, function errorCallback(response) {
			$scope.showSearchByDistanceLoader = false;
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	}

	$scope.searchMerchantByTag = function()
	{
		$scope.showSearchMerchantTagLoader = true;
		$scope.search_by_merchant_tag = document.getElementById("search_by_merchant_tag").value;
		API.getDetails("test/searchbypart",{tag : $scope.search_by_merchant_tag}).then(function successCallback(response) {

			$scope.merchant_details = '';
			if(response.status == 200)
			{
				if(typeof response.data.message.details !='undefined' && response.data.message.details.length>0)
				{
					$scope.merchant_details = response.data.message.details;
				}
			}
			else
			{
				// show error message
			}
			$scope.showSearchMerchantTagLoader = false;
		}, function errorCallback(response) {
			$scope.showSearchMerchantTagLoader = false;
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	}
	$scope.chat_details =[];
  	$scope.sendChatMessageFromCsr = function (){
  		if($scope.csr_message != '')
		{
  			socket.emit("send message",{ "csr_id" : $scope.csr_id,"sender_id" : $scope.csr_id,"customer_id" :$scope.cust_id,"message" : $scope.csr_message,"cust_id" : $scope.send_to_customer});
  		}
  		$scope.csr_message ='';
	}

	socket.on("new message",function(data){
		$scope.chat_details.push(data);
		//$scope.$apply();
		$(".messages").scrollTop($(".messages")[0].scrollHeight);
		$scope.addChatIntoLocalstorage($scope.chat_details);
		if($scope.customer_id == data.cust_id)
		{
			$(".messages").scrollTop($(".messages")[0].scrollHeight);
		}
		else
		{
			for(i=0;i<$scope.user_details.length;i++)
			{
				if($scope.user_details[i].id == data.cust_id)
				{
					$scope.user_details[i].notification +=1;
				}
			}
		}
		if(data.sender_id != $scope.csr_id)
		{
			var myAudio = new Audio("sound/Sonic_Ring_freetone.at.ua.mp3");
			myAudio.play()
		}
		$scope.$digest();
	})
	socket.on("new customer added",function(data){
		for(i=0;i<$scope.user_details.length;i++)
		{
			if(data.id == $scope.user_details[i].id)
			{
				$scope.user_details.splice(i, 1);
			}
		}
		$scope.user_details.push(data);
		localStorage.setItem('user_details', JSON.stringify($scope.user_details));
		$scope.$digest();
	})
	socket.on("exit_connection_with_csr",function(data){
		$scope.new_chat_user_list = angular.copy($scope.user_details);
		$scope.user_details = [];
		for(i=0;i<$scope.new_chat_user_list.length;i++)
		{
			if($scope.new_chat_user_list[i].id != data)
			{
				$scope.user_details.push($scope.new_chat_user_list[i]);
			}
			else
			{
				if(data == $scope.new_chat_user_list[i].id)
				{
					$scope.show_cust = false;
				}
			}
		}
		$scope.$apply();
	})
	$scope.addChatIntoLocalstorage = function(data)
	{
		localStorage.setItem('char_message', JSON.stringify(data));
	}
	$scope.clearTextMessage = function()
	{
		$scope.csr_message = '';
	}
})


.controller('customer', function($scope,$http,$routeParams,$location,$localStorage)
{
	$scope.show_id   = 0;
	$scope.show_cust = false;;
	$scope.offer_history =[];
	$scope.state =[];
	$scope.states = [];
	var socket = io.connect();
	$scope.cust_id 	= $routeParams.userId;
	$scope.chat_details =[];
	$scope.makeNewConnection = function()
	{
		socket.emit('new user',{type : "customer" , "id" : $routeParams.userId,"csr" : $scope.csr_id},function(data){
			if(!data.status)
			{
				alert(data.message)
			}
			else
			{
				$scope.csr_id = data.csr_id;
				localStorage.setItem('customer_csr_name', JSON.stringify(data.csr_id));
			}
		});
	}
	if(localStorage.getItem('customer_csr_name') != 'undefined' && localStorage.getItem('customer_csr_name') != null)
	{
		$scope.csr_id = JSON.parse(localStorage.getItem('customer_csr_name'));
		$scope.makeNewConnection();
	}
	else
	{
		$scope.csr_id   = 'find_new_csr';
		$scope.makeNewConnection();
	}
	socket.on("make_connection_with_csr",function(data){

		localStorage.setItem('customer_csr_name', JSON.stringify(data));
		$scope.csr_id = data;
		$scope.$apply();
	})
	$scope.sendChatMessageByCustomer = function (){
		if($scope.customer_message != '')
		{
  			socket.emit("send message",{ "csr_id" : $scope.csr_id,"sender_id" : $scope.cust_id,"customer_id" :$scope.cust_id,"message" : $scope.customer_message,"cust_id" : $scope.cust_id});
  		}
  		$scope.customer_message ='';
	}
	socket.on("new message",function(data){

		$scope.chat_details.push(data);
		$scope.$apply();
		$(".messages").scrollTop($(".messages")[0].scrollHeight);
		$scope.addChatIntoLocalstorage($scope.chat_details);
	})
	$scope.addChatIntoLocalstorage = function(data)
	{
		localStorage.setItem('char_message', JSON.stringify(data));
	}
	if(localStorage.getItem('char_message') != 'undefined' && localStorage.getItem('char_message') != null)
	{
		$scope.chat_details = JSON.parse(localStorage.getItem('char_message'));
	}
	$(".messages").scrollTop($(".messages")[0].scrollHeight);
	$scope.clearTextMessage = function()
	{
		$scope.customer_message = '';
	}
})
