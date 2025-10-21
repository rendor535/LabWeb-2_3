(function() {
  const example = document.getElementById('example')
  const cw1 = document.getElementById('cw1')
  const cw1_pojedynczy = document.getElementById('cw1_pojedynczy')
  const cw1_nowy = document.getElementById('cw1_nowy')
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

  cw1.addEventListener("click", function() {
    answer.innerHTML = '<p><em>Loading...</em></p>';
    const startTime = Date.now();

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(posts => {
        const elapsed = Date.now() - startTime;
        const delay = Math.max(0, 500 - elapsed);

        setTimeout(() => {
          let html = '<h2>Lista postów</h2>';
          html += '<ul style="list-style:none; padding:0;">';
          posts.forEach(post => {
            html += `
              <li style="margin-bottom:15px; border-bottom:1px solid #ccc; padding-bottom:10px;">
                <strong>${post.id}. ${post.title}</strong><br>
                <em>userId: ${post.userId}</em><br>
                <p>${post.body}</p>
              </li>
            `;
          });
          html += '</ul>';
          answer.innerHTML = html;
        }, delay);
      })
      .catch(error => {
        console.error(error);
        answer.innerHTML = '<p>Błąd podczas pobierania danych :(.</p>';
      });
  });

  cw1_pojedynczy.addEventListener("click", function() {
    answer.innerHTML = '<p><em>Loading...</em></p>';

    fetch('https://jsonplaceholder.typicode.com/posts/67')
      .then(response => response.json())
      .then(post => {
        let html = `
          <h2>Post ID: ${post.id}</h2>
            <strong>${post.title}</strong><br>
            <em>userId: ${post.userId}</em><br>
            <p>${post.body}</p>
        `;
        answer.innerHTML = html;
      })
      .catch(error => {
        console.error(error);
        answer.innerHTML = '<p>Błąd podczas pobierania danych.</p>';
      });
  });

  cw1_nowy.addEventListener("click", async function() {
    answer.innerHTML = '<p><em>Processing...</em></p>';

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: 'Nowy post testowy',
          body: 'To jest przykładowa treść posta utworzonego metodą POST.',
          userId: 1
        }),
      });

      const data = await res.json();
      console.log(data);

      answer.innerHTML = `<p>Dodano nowy post o ID = ${data.id}</p>`;
    } catch (error) {
      console.error(error);
      answer.innerHTML = '<p>Błąd podczas wysyłania posta.</p>';
    }
  });

  cw2.addEventListener("click", function() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-overlay';
    loadingDiv.style.position = 'fixed';
    loadingDiv.style.top = '0';
    loadingDiv.style.left = '0';
    loadingDiv.style.width = '100%';
    loadingDiv.style.height = '100%';
    loadingDiv.style.background = 'rgba(0, 0, 0, 0.5)';
    loadingDiv.style.display = 'flex';
    loadingDiv.style.alignItems = 'center';
    loadingDiv.style.justifyContent = 'center';
    loadingDiv.style.zIndex = '9999';
    loadingDiv.innerHTML = `
      <div style="
        background: white;
        padding: 20px 40px;
        border-radius: 10px;
        font-size: 18px;
        font-weight: bold;
        color: #333;
        box-shadow: 0 0 15px rgba(0,0,0,0.3);
      ">
        Loading...
      </div>
    `;
    document.body.appendChild(loadingDiv);
    const startTime = Date.now();

    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(post => {
        console.log(post);

        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 1000 - elapsed); // minimum 1 sekunda

        setTimeout(() => {
          document.body.removeChild(loadingDiv);
          let html = `
            <style>
              .single-post {
                border: 6px solid #666;
                border-radius: 8px;
                padding: 10px;
                background-color: #b7e6c3ff;
                box-shadow: 2px 2px 6px rgba(0,0,0,0.2);
                width: 60%;
                margin: 10px auto;
              }
              .single-post strong {
                font-size: 18px;
                color: #222;
              }
              .single-post em {
                font-size: 12px;
                color: #555;
              }
              .single-post p {
                font-size: 14px;
              }
            </style>
            <div class="single-post">
              <h2>Post ID: ${post.id}</h2>
              <strong>${post.title}</strong><br>
              <em>userId: ${post.userId}</em><br>
              <p>${post.body}</p>
            </div>
          `;
          answer.innerHTML = html;
        }, remaining);
      })
      .catch(error => {
        console.error(error);
        document.body.removeChild(loadingDiv);
        answer.innerHTML = '<p>Błąd podczas pobierania danych.</p>';
      });
  });

  cw3.addEventListener("click", function() {
    answer.innerHTML = '<p><em>Loading...</em></p>';

    Promise.all([
      fetch('https://my-json-server.typicode.com/rendor535/LabWeb-2_3/posts').then(res => res.json()),
      fetch('https://my-json-server.typicode.com/rendor535/LabWeb-2_3/comments').then(res => res.json())
    ])
      .then(([posts, comments]) => {
        let html = '<h2>Posty</h2>';

        posts.forEach(post => {
          html += `
                               <div style="
                                 border: 2px solid #666;
                                 border-radius: 8px;
                                 padding: 10px;
                                 background-color: #f0f9ff;
                                 margin-bottom: 15px;
                               ">
                                 <h3>${post.id}. ${post.title}</h3>
                                 <p><strong>Book1:</strong> ${post.book1 || '-'}</p>
                                 <p><strong>Book2:</strong> ${post.book2 || '-'}</p>
                                 <p><strong>Ocena:</strong> ${post.rating || '-'}</p>
                                 <h4>Komentarze:</h4>
                                 <ul style="list-style:none; padding-left:0; margin-top:5px;">
                             `;

          comments.filter(c => c.postId === post.id).forEach(comment => {
            html += `
                                 <li style="border-top:1px solid #ccc; margin-top:5px; padding-top:5px;">
                                   <strong>${comment.author}:</strong> ${comment.text}
                                 </li>
                               `;
          });

          html += '</ul></div>';
        });

        answer.innerHTML = html;
      })
      .catch(error => {
        console.error(error);
        answer.innerHTML = '<p>Błąd podczas pobierania danych.</p>';
      });
  });

})();
