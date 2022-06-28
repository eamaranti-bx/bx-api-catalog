///validate campos
(function () {
	'use strict'

	var forms = document.querySelectorAll('.needs-validation')

	Array.prototype.slice.call(forms)
		.forEach(function (form) {
			form.addEventListener('submit', function (event) {
				if (!form.checkValidity()) {
					event.preventDefault()
					event.stopPropagation()
				}
				form.classList.add('was-validated')
			}, false)
		})

//sidebar
	/*	
		var menuItems = "";
		$.ajax({
			url: "https://bx-api-spec-dev.s3.us-west-2.amazonaws.com/all.json",
			success: function(result) {
			$.each(result, function(index, item) {
				menuItems +=' <li class="mb-1">';
				menuItems += '<button class="btn btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">';
				menuItems += `<span>${item.title}</span>`;
				menuItems += `</button>`
				$.each(result, function(index, nombre_reporte)
				{
					subMenuItems += `<span>${item.title}</span> `
				})
				menuItems += "</li>";

			});
			$("#side_menu").html(menuItems);
			}
		});*/
//sidebar	


///
		$.ajax({
			url: "https://bx-api-spec-dev.s3.us-west-2.amazonaws.com/all.json",
			dataType: 'json',
			async: false,
			success: function(result) {
				let html = '';
					for (const i in result) {
						html += `<li class="mb-1"><button class="btn btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#${i}" aria-expanded="true">${i}</button>
					${
						((lis) => {
							let list = '';
							lis.forEach((li) => {
								list += `<div class="collapse hide" id="${i}">
								<ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
								  <li><a href="https://bx-api-spec-dev.s3.us-west-2.amazonaws.com/${i}/${li}.html" class="link-dark">${li}</a></li>
								</ul>
							  </div>`
								
							});
							
							return `<ul class="detail-list m-0 p-0">${list}</ul>`;
							
						})(result[i])
					}
					</li>`;
					}
				$("#side_menu").html(`${html}`);
				
			}
		});
	//cards
	//https://bx-api-spec-dev.s3.us-west-2.amazonaws.com/${i}/${li}.html
	$.ajax({
		url: "https://bx-api-spec-dev.s3.us-west-2.amazonaws.com/all.json",
		dataType: 'json',
		async: false,
		success: function(result) {
			let html = '';
			for (const i in result) {
				html += `<div class="p-4 m-3 bg-light rounded"><h3 class="text-primary">${i}</h3><div class="row">
			${
				((lis) => {
					let list = '';
					lis.forEach((li) => {
						list += `<div class="card m-2 card-reports">
								<div class="card-body">
								<p class="card-text">${li}</p>
								</div><div class="card-footer d-flex justify-content-end">
								<a class="btn btn-secondary text-white font-weight-bold" href="https://bx-api-spec-dev.s3.us-west-2.amazonaws.com/${i}/${li}.html" target="_blank">Explorar API <span class="iconify" data-icon="radix-icons:open-in-new-window"></span></a>
								</div></div>
								`
					});
					return `${list}`;
				})(result[i])
			}
			</div></div>`;
			}
			$("#api-cards").html(`${html}`);
			
		}
	});
	//search
	
	
})()