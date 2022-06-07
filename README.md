# Employee App

## Requirements
* [`NPM`](https://www.npmjs.com/get-npm)
* [`Angular CLI 14.0`](https://cli.angular.io/)
## How to run
1. Clone repository
   ```
   $ git clone https://github.com/ihsaninh/Technical-Assessment-Backoffice.git
   ```
2. Install dependencies
   ```
   $ cd Technical-Assessment-Backoffice
   $ npm install
   ```
3. Jalankan angular CLI
   ```
   $ ng serve
   ```

Aplikasi ini menggunakan data dari JSON Server yang di deploy di Heroku. Atau jika ingin menggunakan data dari localhost, silahkan ganti urlnya di file `src/environments/environment.ts`. Berikut caranya.

1. Install json server di terminal
   ```
   $ npm install -g json-server
   ```
2. Pastikan sudah di dalam projek directory lalu jalankan di terminal untuk menjalankan server
   ```
   $ json-server --watch db.json
   ```
3. Ubah url di file `src/environments/environment.ts` ke `http://localhost:3000/`
   
Maka aplikasi akan menggunakan data dari local.

## Feature dan Penjelasan Projek
* Aplikasi terdiri dari beberapa halaman
  * *Halaman Login*<br />
    Di halaman ini user dapat login dengan mengisi username dan password dengan data bebas. Tidak ada user tertentu untuk dapat login ke aplikasi. terdapat pengecekan username dan password *required*. Jika sudah berhasil login data user akan disimpan di local storage, setelah itu user diarahkan ke halaman dashboard.
    <br />
  * *Halaman Dashboard*
    Di halaman ini akan dibuat tampilan seperti admin dashboar yang memuat sidebar di sebelah kiri untuk menu menu di dalam admin dashboard. Akan ada menu **Employee Management** untuk mengarahkan ke section yang berhubungan dengan employee.
    * *Halaman Employee List*<br />
      Di halaman ini terdapat list employee yang dapat di filter search yang dapat memfilter bedasarkan seluruh query pada table, dan tambahan filter bedasarkan range salary. Di sebelahnya ada tombol untuk add employee yang akan mengarahkan ke add employee page. Dibawah nya terdapat table list employee yang dapat di sortir dengan mengklik table header setiap column kecuali action. Di table juga sudah tersedia fitur pagination di bawahnya dan ada pilihan untuk mengubah jumlah data per page.
    * *Halaman Add Employee*<br />
      Di halaman ini terdapat form untuk menambahkan employee. Form merupakan semua field yang terdapat pada data model employee. Semua form adalah required dan tidak dapat di save jika tidak terisi semua. Terdapat juga pencekan email apakah email valid atau tidak. Untuk group menggunakan MAT-AUTOCOMPLETE dan dapat search group berdasarkan keyword, dan untuk dateBirth menggunuakan datepicker dengan validasi tidak boleh melebihi hari sekarang. Terdapat tombol cancel untuk kembali ke halaman employee list, dan tombol Add untuk menyimpan data employee.
    * *Halaman Edit Employee*<br />
      Halaman ini sama dengan add employee hanya saat mengklik tombol edit maka akan mengambil data employee yang akan di edit dan mengisi form dengan data tersebut. Setelah itu employee dengan id tersebut akan di edit.
    * *Halaman Detail Employee*<br />
      Halaman ini menampilkan detail employee. Untuk menuju halaman ini dapat mengklik username pada table employee dan akan diarahkan ke halaman detail. Terdapat tombol edit dan delete untuk mengubah dan menghapus data employee OK untuk kembali ke halaman list employee.

## Tambahan
  * Terdapat pengecekan apakah user sudah login atau belum, jika belum maka akan diarahkan ke halaman login. Jika sudah login maka akan diarahkan ke halaman dashboard. fitur ini menggunakan *auth.guard*.<br />
  * Admin dapat menghapus data employee, dengan mengklik tombol delete pada table employee.