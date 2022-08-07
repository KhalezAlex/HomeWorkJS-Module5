{
  let styles = new Array();

  function styleText() {
    console.log(document.getElementById("container").lastChild);
    if (document.getElementById("container").lastChild.id != "button")
      document.getElementById("container").lastChild.remove();
    setStyles();
    let par = document.createElement("p");
    par.innerHTML = document.getElementById("textArea").value;
    par.style.backgroundColor = "beige";
    par.style.borderStyle = "solid";
    par.style.borderWidth = "1px";
    if (styles[0] != "") par.style.fontWeight = "bolder";
    if (styles[2] != "") par.style.fontStyle = "italic";
    if (styles.length == 4) par.style.textAlign = styles[3];
    if (styles[1] == "") {
      par.style.width = "90%";
      document.getElementById("container").appendChild(par);
    } else {
      let u = document.createElement("u");
      u.style.width = "90%";
      u.appendChild(par);
      document.getElementById("container").appendChild(u);
    }
  }

  function setStyles() {
    while (styles.length != 0) styles.pop();
    let t = document.getElementsByTagName("input");
    for (let i = 0; i < t.length - 1; i++) {
      if (t[i].checked) {
        if (t[i].name == "text-align") styles.push(t[i].id);
        else styles.push(t[i].name);
      } else if (t[i].name != "text-align") styles.push("");
    }
  }
}
