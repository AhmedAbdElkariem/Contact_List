var id = 0;
var flag;

function Contact(name, phone, id, email, gender) {
    this.name = name;
    this.phone = phone;
    this.id = id;
    this.email = email;
    this.gender = gender;
}

function getContacts() {
    var contacts = new Array;
    var contacts_str = localStorage.getItem('contacts');
    if (contacts_str != null) {
        contacts = JSON.parse(contacts_str);
    }
    return contacts;
}

function addContact() {
    id++;
    if (validate()) {
        var name = document.getElementById("name").value;
        var phone = document.getElementById("phone").value;
        var email = document.getElementById("email").value;
        var gender = document.getElementById("gender").value;

        var emp = new Contact(name, phone, id, email, gender);
        var contacts = getContacts();
        contacts.push(emp);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        return true;
    }
    else
        return false;
}


function validate() {
    var testName, testEmail, testPhone;
    var name = document.getElementById("name").value;
    if (name == "") {
        testName = false;
        document.getElementById("errname").innerHTML = "			Empty Field";
    }
    else
        document.getElementById("errname").innerHTML = "";

    var phone = document.getElementById("phone").value;
    var re = /^(010|011|012)[0-9]{8}$/;
    if (re.test(phone) == false) {
        testPhone = false;
        document.getElementById("errphone").innerHTML = "			Invalid Phone";
    }
    else
        document.getElementById("errphone").innerHTML = "";

    var email = document.getElementById("email").value;
    var re = /^\S+@\S+\.\S+$/;
    if (re.test(email) == false) {
        testEmail = false;
        document.getElementById("errmail").innerHTML = "			Invalid Field";
    }
    else
        document.getElementById("errmail").innerHTML = "";

    var gender = document.getElementById("gender").value;

    if (testName != false && testPhone != false && testEmail != false) {
        return true;
    }
    else
        return false;
}

function addCon() {
    if (addContact()) {
        show();
        location.reload();
        document.getElementById("addbtn").href = "#mainPage";
    }
}


function show() {

    var content = document.getElementById("ulContent");
    document.getElementById("ulContent").innerHTML = "";

    var texts = getContacts();

    for (i = 0; i < texts.length; i++) {
        var liNode = document.createElement("li");
        liNode.setAttribute("id", "li" + i);
        liNode.setAttribute("class", "ui-btn ui-btn-inline");

        var linkNode = document.createElement("a");
        linkNode.setAttribute("href", "#infoPage");
        linkNode.setAttribute("id", i);
        linkNode.setAttribute("onclick", "calldelete(event)");


        var imgNode = document.createElement("img");

        if (texts[i].gender == "male") {
            imgNode.setAttribute("src", "user.png");
        } else {
            imgNode.setAttribute("src", "female.png");
        }

        imgNode.setAttribute("id", i);

        var boldNode = document.createElement("b");
        boldNode.setAttribute("id", i);
        var ttext = document.createTextNode(texts[i].name);
        boldNode.appendChild(ttext);

        linkNode.appendChild(imgNode);
        linkNode.appendChild(boldNode);

        var linkDelete = document.createElement("a");
        //linkDelete.setAttribute("href", "#");
        linkDelete.setAttribute("id", "call"+i);
        linkDelete.setAttribute("class", "ui-btn ui-icon-phone ui-btn-icon-right");
        linkDelete.setAttribute("onclick", "callingMain(event)");

        liNode.appendChild(linkNode);
        liNode.appendChild(linkDelete);

        content.appendChild(liNode);

    }
}

function calldelete(event) {
    id = event.target.id;
    var contacts = getContacts();
    document.getElementById("contactName").innerHTML = contacts[id].name;
    if (contacts[id].gender == "male") {
        document.getElementById("contactimg").setAttribute("src", "user.png");
    } else {
        document.getElementById("contactimg").setAttribute("src", "female.png");
    }
}

function deleteStorage() {
    document.getElementById(id).parentElement.remove();
    var texts = getContacts();
    texts.splice(id, 1);
    localStorage.setItem('contacts', JSON.stringify(texts));
    show();
    location.reload();
}

function updateStorage() {

    flag = false;
    var texts = getContacts();
    document.getElementById("updateName").innerHTML = texts[id].name;
    document.getElementById("name").value = texts[id].name;
    document.getElementById("phone").value = texts[id].phone;
    document.getElementById("email").value = texts[id].email;
    document.getElementById("gender").value = texts[id].gender;
}

function update() {

    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var gender = document.getElementById("gender").value;

    if (validate()) {
        var contacts = getContacts();
        contacts[id].name = name;
        contacts[id].phone = phone;
        contacts[id].email = email;
        contacts[id].gender = gender;
        localStorage.setItem('contacts', JSON.stringify(contacts));
        return true;
    } else {
        return false;
    }
}

function saveOrUpdate() {
    if (flag) {
        addCon()
    } else {

        if (update()) {
            show();
            location.reload();
            document.getElementById("addbtn").href = "#mainPage";
        }
    }
}

function add() {
    document.getElementById("updateName").innerHTML = "New Contact";
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("gender").value = "male";
    flag = true;
}

function back() {
    document.getElementById("errname").innerHTML ="";
    document.getElementById("errmail").innerHTML ="";
    document.getElementById("errphone").innerHTML ="";
    if (flag) {
        document.getElementById("back").setAttribute("href", "#mainPage");
    } else {
        document.getElementById("back").setAttribute("href", "#infoPage");
    }
}

function calling()
{
	var texts = getContacts();
	var phone = "tel:"+ texts[id].phone;
	document.getElementById("telcall").href = phone;
}

function callingMain(event){
    var str = event.target.id;
    var res = str.substring(4,5);
    var id = parseInt(res);

    //alert(id);
    var texts = getContacts();
	var phone = "tel:"+ texts[id].phone;
    document.getElementById("call"+id).href = phone;
    alert("ss");
}

function cancel() {
    document.getElementById("errname").innerHTML ="";
    document.getElementById("errmail").innerHTML ="";
    document.getElementById("errphone").innerHTML ="";
}

document.getElementById("addbtn").onclick = saveOrUpdate;
document.getElementById("addlink").onclick = add;
document.getElementById("deleteLink").onclick = deleteStorage;
document.getElementById("updatebtn").onclick = updateStorage;
document.getElementById("back").onclick = back;
document.getElementById("telcall").onclick = calling;
document.getElementById("cancel").onclick = cancel;

show();