function test(id) {
  var result = true;

  // 必須チェック(text)
  var allText1 = $(id+" :text[data-required=true]");
  for ( let i = 0; i < allText1.length; i++ ) {
    if ( allText1[i].value === "" ) {
      showErrorMessage("required", allText1[i].name);
      result = false;
    } else {
      hideErrorMessage("required", allText1[i].name);
    }
  }

  // 必須チェック(radio)
  var allRadio1 = $(id+" :radio[data-required=true]");
  for ( let i = 0; i < allRadio1.length; i++ ) {
    let radioItems = $(id+" :radio[name="+ allRadio1[i].name +"]");
    let radioChecked = false;
    for ( let j = 0; j < radioItems.length; j++ ) {
      if ( radioItems[j].checked ) {
        // ラジオ項目のうち1つでもチェックされていればOK
        radioChecked = true;
        break;
      }
    }
    if ( radioChecked ) {
      hideErrorMessage("required", allRadio1[i].name);
    } else {
      showErrorMessage("required", allRadio1[i].name);
      result = false;
    }
  }

  // 必須チェック(textarea)
  var allTextarea1 = $(id+" textarea[data-required=true]");
  for ( let i = 0; i < allTextarea1.length; i++ ) {
    if ( allTextarea1[i].value === "" ) {
      showErrorMessage("required", allTextarea1[i].name);
      result = false;
    } else {
      hideErrorMessage("required", allTextarea1[i].name);
    }
  }

  // メアドチェック(text)
  var allText2 = $(id+" :text[data-checkemail=true]");
  for ( let i = 0; i < allText2.length; i++ ) {
    if ( checkEmail(allText2[i].value) ) {
      hideErrorMessage("checkemail", allText2[i].name);
    } else {
      showErrorMessage("checkemail", allText2[i].name);
      result = false;
    }
  }

  return result;
}

function checkEmail(str) {
  var emailExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  var found = str.match(emailExp);
  if ( found && found.length > 0 ) {
    return true;
  }
  return false;
}

function showErrorMessage(type,name) {
  //console.log("name: "+ name);
  $(".error-message-"+type+"."+name).show();
}

function hideErrorMessage(type,name) {
  $(".error-message-"+type+"."+name).hide();
}