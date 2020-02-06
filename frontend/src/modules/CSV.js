class CSV {
  constructor(data, fileName) {
    this.data = data || [];
    this.csv = '';
    this.fileName = fileName || 'Download';
    this.link = null;
  }

  hasData() {
    return this.data && Array.isArray(this.data) && this.data.length > 0
  }

  generate() {
    if (!this.hasData()) return

    const keys = Object.keys(this.data[0]);
    const columnDelimiter = ",";
    const lineDelimiter = "\n";

    this.csv = "";
    this.csv += keys.join(columnDelimiter);
    this.csv += lineDelimiter;

    this.data.forEach(item => {
      let counter = 0;
      keys.forEach(key => {
        if (counter > 0) {
          this.csv += columnDelimiter;
        }

        if (
          item[key] &&
          typeof item[key] === "string" &&
          item[key].includes(",")
        ) {
          this.csv += item[key].replace(",", "");
        } else {
          this.csv += item[key];
        }
        counter++;
      });
      this.csv += lineDelimiter;
    });
  }

  download() {
    if (!this.hasData()) return

    const csvData = "data:text/csv;charset=utf-8," + this.csv;
    const encodedUri = encodeURI(csvData);
    this.link = document.createElement("a");
    this.link.setAttribute("href", encodedUri);
    this.link.setAttribute("download", this.fileName + '.csv');
    this.link.setAttribute('data-testid', "CSV Download Link")
    document.body.appendChild(this.link);
    this.link.click();
  }
}

export default CSV
