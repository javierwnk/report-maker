var ExcelToJSON = function () {

    this.parseExcel = function (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, {
                type: 'binary'
            });
            workbook.SheetNames.forEach(function (sheetName) {
                // Here is your object
                var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                makeReport(XL_row_object)
            })
        };

        reader.onerror = function (ex) {
            console.log(ex);
        };

        reader.readAsBinaryString(file);
    };
};

function handleFileSelect(evt) {

    var files = evt.target.files; // FileList object
    var xl2json = new ExcelToJSON();
    xl2json.parseExcel(files[0]);
}

const makeReport = (excelInfo) => {
    const COLUMNS = Object.keys(excelInfo[0]) // Linea, Modelo, Etc

    let encabezados = ""

    COLUMNS.forEach(row => encabezados += `
        <th>${row}</th>
    `)

    if(document.getElementById("tato").checked == true) {
        encabezados += `<th>TATO</th>`
    }

    let content = ""

    excelInfo.forEach((objectRow) => {

        content += `<tr>`

        for (const key in objectRow) {

            if (key == "Imagen") {
                content += `<td class="image"><img src="${objectRow[key]}"/></td>`
            } else {
                content += `<td>${objectRow[key]}</td>`
            }

        }

        if(document.getElementById("tato").checked == true) {
            content += `<td></td>`
        }
    

        content += `</tr>`

    })

    document.getElementById("encabezados").innerHTML = encabezados
    document.getElementById("contenido").innerHTML = content

    let images = document.querySelectorAll(".image")
    images.forEach(image => {
        image.style.width = `${document.getElementById("tamano").value}px`
        image.style.height = `${document.getElementById("tamano").value}px`
    } )
}