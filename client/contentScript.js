const COOKIE = "";

const THEME = "";

const _fetch = window.fetch.bind(window);

function defaultQuestion(message) {
  const typeArea = document.getElementsByClassName(
    "_83c48d7c2caf23138114b9751434037e"
  );

  const inputs = document.querySelectorAll('input[type="checkbox"]');
  if (inputs.length > 0) {
    message += "There are two or more correct answers. ";
  } else {
    message += "There only one correct answers. ";
  }

  const title = document.getElementsByClassName(
    "a4467d319288c09c67943532e2bcdf19"
  )[0].firstChild.firstChild.textContent;

  message += title;

  const testBody = document.getElementsByClassName(
    "adb06650714607f044107142620f4d43"
  );
  if (testBody.length > 0) {
    for (let i = 0; i < testBody.length; ++i) {
      const text = testBody[i].firstChild.textContent;
      if (text !== "" && text !== undefined && text !== null) {
        message += `${text} `;
      }
    }
  }

  if (typeArea.length === 0) {
    message += "Answer options: ";

    const answers = document.getElementsByClassName(
      "c061891f8e2f1ba3d4271289ac9ebf5a"
    );
    let i = 1;
    for (const x of answers) {
      if (
        x.parentElement.parentElement.parentElement.parentElement.parentElement
          .parentElement.parentElement.parentElement.parentElement.parentElement
          .parentElement.className === "_1d2ac95b73501ef4115ea90074b49c2d"
      )
        message += `${i++})${x.firstChild.textContent}. `;
    }
  }

  return message;
}

function tableQuestion(message, table) {
  message += "Establish compliance. Qustions: ";
  let j = 0;
  for (let i = table.length / 2; i < table.length; ++i) {
    message += `${++j}) ${
      table[i].firstChild.firstChild.firstChild.textContent
    } `;
  }
  message += "Answers: ";
  j = 0;
  for (let i = 0; i < table.length / 2; ++i) {
    message += `${++j}) ${
      table[i].firstChild.firstChild.firstChild.textContent
    } `;
  }

  return message;
}

(() => {
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    console.log("aga");
    if (obj.type === "INIT") {
      addButton();
    }
  });

  const addButton = async () => {
    const header = document.getElementsByClassName(
      //"_7c0e233b43240c13692d24d0bc8b33f3"
      "_4eb6b8f17be72025236c9471d841a05d"
    )[0];

    const div = document.createElement("div");
    div.className = "_42dafca8e452c7902e934219b3ac19ff";

    console.log(header);

    const res = document.createElement("p");
    res.className = "_8c712947e1f8101d7f87d0051c18881e";

    const btn = document.createElement("button");
    btn.textContent = "s";

    const resetBtn = document.createElement("button");
    resetBtn.textContent = "r";

    resetBtn.onclick = async () => {
      res.textContent = "";
    };

    btn.onclick = async () => {
      let message =
        THEME +
        " test. Please write only correct answer. Please write your answer in Ukrainian language ";

      const table = document.getElementsByClassName(
        "c061891f8e2f1ba3d4271289ac9ebf5a ea1ec5644fcb2b359aade40392aa34d7"
      );

      if (table.length > 0) {
        message = tableQuestion(message, table);
      } else {
        message = defaultQuestion(message);
      }

      console.log(message);
      const image = document.querySelector("img");
      let response;
      if (image === null) {
        response = await _fetch(`http://localhost:8899/api`, {
          method: "POST",
          body: JSON.stringify({
            message: message,
            cookie: COOKIE,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        response = await _fetch(`http://localhost:8899/api/withImage`, {
          method: "POST",
          body: JSON.stringify({
            image: image.src,
            message: message,
            cookie: COOKIE,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      const data = await response.json();
      console.log(data);
      res.textContent = data;
    };

    div.appendChild(btn);
    div.appendChild(resetBtn);
    div.appendChild(res);
    header.appendChild(div);
  };
})();
