# PDFiyer

PDFiyer is a command-line tool that generates a one page PDF file from a HTML file using Puppeteer.

## Installation

1. Clone the repository:

```bash
   bash git clone https://github.com/snoodelz/pdfiyer.git
```

2. Navigate to the project directory:

```bash
   bash cd pdfiyer
```

3. Install the dependencies:

```bash
npm install
```

## Running the Script

To generate a PDF from a HTML file, you can run the script with the following command:

```bash
node pdf.js <filename>
```

or

```bash
npm run pdf <filename>
```

Replace `<filename>` with the name of your HTML file or the full path to the file. The script will prompt you to enter a filename for the generated PDF. After entering the filename, the PDF will be saved in the `PDF` directory.

For example, if you have a HTML file named `example.html` in the HTML folder, you would run:

```bash
node pdf.js example
```

This will create a PDF named `example.pdf` in the `PDF` directory.
