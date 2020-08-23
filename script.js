
let 	lists 				= {},
		phrases 			= {},
		id 					= 0,
		activeList,
		listId 				= 0,
		itemsNum 			= 0,
		phrasesCreate 		= document.getElementById('phrasesCreate'),
		listCreate 			= document.getElementById('listCreate'),
		complateListBtn 	= document.getElementById('complateListBtn'),
		firstStepBtn 		= document.getElementById('firstStepBtn'),
		shuffleBtn 			= document.getElementById('shuffleBtn'),
		mainScope 			= document.getElementById('main-scope'),
		inputListTitle 		= document.getElementById('inputListTitle'),
		inputText1 			= document.getElementById('inputText1'),
		inputText2 			= document.getElementById('inputText2'),
		editBtns 			= document.getElementsByClassName('btn-edit'),
		bdCards 			= document.getElementsByClassName('bd-card'),
		listFirstTest,
		listSecondTest;




function activeLastList(){
	for (var i = listId.length - 1; i >= 0; i--) {
		listFirstTest 		= document.getElementById('list-first-test'+listId);
		listSecondTest 		= document.getElementById('list-second-test'+listId);
	}
};

function getActiveList(){
	if(activeList){
		return activeList;
	}
}


function setActiveList(activeListLink){
	activeList = activeListLink; 
}


function activeThisList(id){
	setActiveList(lists['list-'+id]);
	listFirstTest = document.getElementById('list-first-test'+id);
	listSecondTest 	= document.getElementById('list-second-test'+id);
	createListener();
	listFirstTest.parentElement.parentElement.style.background = "rgb(40, 50, 72)";
	listFirstTest.parentElement.parentElement.style.color = "rgb(255, 255, 255)";
}


function getPhraseObject(){
	return{
		id: ++id,
		firstPart: inputText1.value,
		secondPart: inputText2.value
	}
}


function addNewPhrase(){
	if(inputText1.value && inputText2.value){
		let tempObj = getPhraseObject();
		let tempList = getActiveList();
		tempList['phrase'+itemsNum] = tempObj;
	}
}





function addNewListToLists(title, id){
	lists["list-"+listId]={}
	console.log('hello');
	console.log(lists);
}




function editList(form){
	this.id = listId++;
	this.title
	this.phrases = {};
}

function createListener(){
	let a=0;
	if(a===0){

		//FIRST WORD INPUT
		listFirstTest.addEventListener("click", function (e) { 
		    if (e.target.tagName === 'A'){
				listItemLoop(this);
		    	e.target.classList.toggle("active");
				isTrue();
		    }
		});

		//SECOND WORD INPUT
		listSecondTest.addEventListener("click", function (e) { 
		    if (e.target.tagName === 'A'){
				listItemLoop(this);
		    	e.target.classList.toggle("active");
		    	isTrue();
		    }
		});


		// bdCards
		for(var i=0;i<bdCards.length;i++){
		  	bdCards[i].style.background = "rgba(0,0,0,.055)";
		  	bdCards[i].style.color = "rgba(0,0,0,1)";
		}


		// EDIT BUTTON
		for(var i=0;i<editBtns.length;i++){
		  	editBtns[i].addEventListener("click", function (e) { 
			    e.preventDefault();
			    activeThisList(this.dataset.listid);
			    getActiveList
			});   
		}






		a++
	}
	else{
		return;
	}
}

firstStepBtn.addEventListener("click", function (e) { 
    e.preventDefault();
    console.log(e)
    e.path[1].style.display = 'none';
    phrasesCreate.style.display = "block";
    listCreate.style.display = "block";
});

phrasesCreate.addEventListener("submit", function (e) { 
    e.preventDefault();
   	addNewPhrase();
   	printNewPhrase();
   	itemsNum++;
});

complateListBtn.addEventListener("click", function (e) { 
    e.preventDefault();
	createNewList(inputListTitle.value)
});

shuffleBtn.addEventListener("click", function (e) { 
	for (var i = listFirstTest.children.length; i >= 0; i--) {
	    listFirstTest.appendChild(listFirstTest.children[Math.random() * i | 0]);
	    listSecondTest.appendChild(listSecondTest.children[Math.random() * i | 0]);
	}
});





function listItemLoop(item){
	for(var i=0; i<item.children.length; i++) {
	    item.children[i].classList.remove("active");
	}
}

function isTrue(){
	var firstItem, secondItem;
	for(var i=0; i<listFirstTest.children.length; i++) {
		if(listFirstTest.children[i].classList.contains('active')){
			firstItem = listFirstTest.children[i];
		}
		if(listSecondTest.children[i].classList.contains('active')){
			secondItem = listSecondTest.children[i];
		}
	}

	if(firstItem && secondItem){
		if(firstItem.dataset.id === secondItem.dataset.id){
			complatePhrase(firstItem, secondItem);
		}
		else{
			errorPhrase(firstItem, secondItem);
		}
	}
	else{
		return;
	}

}

function errorPhrase(firstItem, secondItem){
	listItemLoop(listFirstTest);
	listItemLoop(listSecondTest);
	firstItem.classList.add("list-group-item-danger");
	secondItem.classList.add("list-group-item-danger");
	setTimeout(function(){
  		firstItem.classList.remove("list-group-item-danger");
  		secondItem.classList.remove("list-group-item-danger");
	}, 1000);
}

function complatePhrase(firstItem, secondItem){
	listItemLoop(listFirstTest);
	listItemLoop(listSecondTest);
	firstItem.classList.add("list-group-item-success");
	secondItem.classList.add("list-group-item-success");
}







function createNewList(title){
    let output = ""; 
    output += '<div class="row justify-content-around bd-card">'
    output += '<div class="col-12 title-list"><h3>'+ title + '</h3><div><button data-listid='+ listId +' type="button" class="btn btn-warning btn-edit"><i class="fas fa-pen-fancy"></i></button><button data-listid='+ listId +' type="button" class="btn btn-danger btn-edit"><i class="fas fa-trash"></i></button></div></div>'
	output += '<div class="col-5"><ul class="list-group" id="list-first-test'+ listId +'"></ul></div>'
	output += '<div class="col-5"><ul class="list-group" id="list-second-test'+ listId +'"></ul></div></div>'
	mainScope.insertAdjacentHTML('afterbegin', output);
	addNewListToLists(title, id);
	activeThisList(listId);
	listId++;
	console.log('List created:' + getActiveList())
	console.log('lists: '+ lists);
}



function printNewPhrase(){
	if(inputText1.value && inputText2.value){
		let output = ""; 
	    let output2 = "";

		if(inputText1.value){
    		output += '<a  data-id='+ itemsNum +'  class="list-group-item list-group-item-action">' + inputText1.value + '</a>';
    	}
    	if(inputText2.value){
    		output2 += '<a  data-id='+ itemsNum +'  class="list-group-item list-group-item-action">' + inputText2.value + '</a>';
    	}

		listFirstTest.insertAdjacentHTML('beforeend', output);
		listSecondTest.insertAdjacentHTML('beforeend', output2); 
		output = "";
		output2 = "";
	}
}




// function createPhrasesObj(phrase){
// 	var _id = id++;
// 	var tempObj = {
// 		id: _id,
// 		firstPart: phrase[0].value,
// 		secondPart: phrase[1].value
// 	};

// 	phrases['phrase-'+itemsNum++] = tempObj;
// 	console.log(phrases);
// }