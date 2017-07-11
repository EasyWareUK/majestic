
  
	var replyBtns = document.getElementsByClassName("btn btn-primary rightfloat btnFill");
	var reviewBtn = document.getElementsByClassName("btn btn-primary rightfloat btnFill review");
	var likedBtns = document.getElementsByClassName("btn btn-primary leftfloat likeBtn");
	var notLikeBtns = document.getElementsByClassName("btn btn-secondary leftfloat likeBtn");
	
	
  
	for (var i=0; i < replyBtns.length; i++) {
		replyBtns[i].onclick = doReply;
	}
	
	for (var i=0; i < reviewBtn.length; i++) {
		reviewBtn[i].onclick = doReview;
	}
	
	for (var i=0; i < likedBtns.length; i++) {
		likedBtns[i].onclick = function(){ showLiked(this, true)};
	}
	
	for (var i=0; i < notLikeBtns.length; i++) {
		notLikeBtns[i].onclick = function(){ showLiked(this, false)};
	}
	

	
	
	function doReview(evt)
	{
		doReply(evt, true);
	}
	
	function doReply(evt, isReview)
	{
		if(isReview == "undefined")
			isReview = false;
			
		
		//var msg = document.getElementById("reply").value;
		if(!isReview)
		{
			var msg = this.previousElementSibling.firstElementChild.value;
			var sendElement = this.parentElement;
		}
		else
		{
			var msg = document.getElementById("review").value; 
			var replyContainer = document.getElementsByClassName("container thinBorder replyContainer")[0];
		}
		
		if (!msg || msg.trim().length<1)
		{
			alert("Please enter a message")
				return;
		}
		
		
		var newCommentEl = createEl("div", "class", "commentElement");
	  
	  
	  
		//<div class="commentStats"><span>John Thomas</span> Yesterday</div>
		var newCommentElChild1 = document.createElement("div");
		var newCommentElChild1Child1 = createEl("span", "", "", "You");
	  
		newCommentElChild1.appendChild(newCommentElChild1Child1);
		var regTxt = document.createTextNode(" Today");
		newCommentElChild1.appendChild(regTxt);
	  
		var commentStatsAtt = document.createAttribute("class");       // Create a "class" attribute
		commentStatsAtt.value = "commentStats";                           // Set the value of the class attribute
		newCommentElChild1.setAttributeNode(commentStatsAtt);
		//***** END
	  
	  
		//<div class="speech-box nonInputBox top">fsd sfsdfds</div>
		var newCommentElChild2 = createEl("div", "class", "speech-box nonInputBox top", msg);
		//***** END
		
		//<div class="likesStats"><div class="btn btn-secondary leftfloat">Like</div> <div class="liketotals">0 person likes this</div></div>
		var newCommentElChild3 = createEl("div", "class", "likesStats");
		var newCommentElChild3Child1 = createEl("div", "class", "btn btn-secondary leftfloat likeBtn", "Like");
		newCommentElChild3Child1.onclick = function(){ showLiked(this, false)};
		var newCommentElChild3Child2 = createEl("div", "class", "liketotals", "0 person likes this");
		newCommentElChild3.appendChild(newCommentElChild3Child1);
		newCommentElChild3.appendChild(newCommentElChild3Child2);
	  
	  
	  
		newCommentEl.appendChild(newCommentElChild1);
		newCommentEl.appendChild(newCommentElChild2);
		newCommentEl.appendChild(newCommentElChild3);
		
		if(isReview)
		{
	  
		/*
			<div>
				<div class="speech-box inputtop" >
					<textarea class="fillArea" placeholder="Write a comment..."></textarea>
				</div>
				<div class="btn btn-primary rightfloat btnFill">SEND</div>
			</div>
		*/

			var newCommentElChild4 = createEl("div", "class", "container thinBorder replyContainer");
			var newCommentElChild4B = createEl("div", "", "");
			var newCommentElChild4BChild1 = createEl("div", "class", "speech-box inputtop");
			var newCommentElChild4BChild1Child1 = createEl("textarea", "class", "fillArea");
			var tmpxAtt = document.createAttribute("placeholder"); // Set the value of the tag attribute
			tmpxAtt.value = "Write a comment...";
			newCommentElChild4BChild1Child1.setAttributeNode(tmpxAtt);
			
			
			newCommentElChild4BChild1.appendChild(newCommentElChild4BChild1Child1);
			var newCommentElChild4BChild2 = createEl("div", "class", "btn btn-primary rightfloat btnFill", "SEND");
			newCommentElChild4BChild2.onclick = doReply;
			newCommentElChild4B.appendChild(newCommentElChild4BChild1);
			newCommentElChild4B.appendChild(newCommentElChild4BChild2);
			newCommentElChild4.appendChild(newCommentElChild4B);
			
			newCommentEl.appendChild(newCommentElChild4);
		}
		
		
		if(isReview)
		{
			replyContainer.nextElementSibling.parentElement.insertBefore(newCommentEl, replyContainer.nextElementSibling);
			document.getElementById("review").value = ""; 
		}
		else
		{
			sendElement.parentElement.insertBefore(newCommentEl, sendElement);
			this.previousElementSibling.firstElementChild.value = "";
		}
		
		
	  
  }
  
  
	function createEl(tag, attrType, attVal, textNode)
	{
		var theEl = document.createElement(tag);	       // Create a tag attribute
		
		if(typeof attrType !== "undefined" && attrType.length > 0 && attVal.length > 0)
		{
			var theElAtt = document.createAttribute(attrType); // Set the value of the tag attribute
			theElAtt.value = attVal;
			theEl.setAttributeNode(theElAtt);
		}
		
		if(typeof textNode !== "undefined")
		{
			var txtNode = document.createTextNode(textNode);
			theEl.appendChild(txtNode);
		}
		
		return theEl;
	}
  
  
	function showLiked(elem, isLiked)
	{
		var likedMsg = elem.nextElementSibling.innerHTML;
		if (isLiked)
		{
			likedMsg = likedMsg.replace("You and ", "");
			elem.classList.remove("btn-primary");
			elem.classList.add("btn-secondary");
			elem.onclick = function(){ showLiked(this, false)};
		}
		else
		{
			likedMsg = "You and " + likedMsg;
			elem.classList.remove("btn-secondary");
			elem.classList.add("btn-primary");
			elem.onclick = function(){ showLiked(this, true)};
		}
		elem.nextElementSibling.innerHTML = likedMsg;
	}

  
	function showObj(obj) 
	{
		for (prop in obj) 
		{
			console.log("--- " + prop + " = " + obj[prop] + "\n");
		}
	}