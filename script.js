(function() {
  const example = document.getElementById('example')
  const cw1 = document.getElementById('cw1')
  const cw2 = document.getElementById('cw2')
  const cw3 = document.getElementById('cw3')
  const answer = document.getElementById('answer')

  example.addEventListener("click", function() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(array => {
        console.log(array)
        answer.innerHTML = JSON.stringify(array);
      })
  })

  cw1.addEventListener("click", function () {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => {
      let html = '<h2>Lista postów</h2>';
      html += '<ul style="list-style:none; padding:0;">';
      posts.forEach(post => {
          html += `
            <li style="margin-bottom:15px; border-bottom:1px solid #ccc; padding-bottom:10px;">
              <st rong>${post.id}. ${post.title}</strong><br>
              <em>userId: ${post.userId}</em><br>
              <p>${post.body}</p>
            </li>
          `;
        });
      html += '</ul>';
      answer.innerHTML = html;
    })
    .catch(error => {
      console.error(error);
      answer.innerHTML = '<p>Błąd podczas pobierania danych.</p>';
    });
  });

  cw2.addEventListener("click", function() {
    //TODO

  })

  cw3.addEventListener("click", function() {
    //TODO

  })

})();
