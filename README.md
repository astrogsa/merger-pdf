## MergerPDF - Description
A desktop application built in Javascript with the aim of merging multiple PDF files into a single PDF file.
The application is built using the Electron library to make the application cross-platform.

The main function of the application which is to merge PDFs is powered by the npm easy-pdf-merge module and
the code for the npm module can be <a href="https://github.com/karuppiah7890/easy-pdf-merge">found here </a>


## Installation
Copy the files from the repository, and paste them in a folder of your choice. Access the folder via terminal (command prompt) and run the command:

```
npm install
or
yarn install
```


## Usage
Navigate to the project folder using the terminal (command prompt), and run the command below:

```
yarn start
or
electron .
```


## Similar libraries
pdf-merge has a dependency on PDFtk.
easy-pdf-merge has a dependency on the Apache PDFBox® - A Java PDF Library.
pdfmerge has a dependency on python and PyPDF2.

## License
The MIT License (MIT)

Copyright (c) 2017 GrofGraf

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
