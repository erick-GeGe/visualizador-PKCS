//import * as p12 from 'p12-pem';
const crypto = require("crypto")
var forge = require('node-forge');
var fs = require('fs');
const p12 = require('p12-pem');
const pem2jwk = require('pem-jwk').pem2jwk;

var pki = forge.pki;

const {pemKey, pemCertificate, commonName} = p12.getPemFromP12('Cert_CACRLAdult-AFVig.p12', '1234');
console.log('obtener la llave privada en  PEM:');
console.log( pemKey);

//var nuev = String(pemCertificate)

console.log('obtener el certificado en  PEM:');
console.log( pemCertificate)

console.log('obtener el nombrecomun o  commonName:');
console.log(commonName);

//var pki = forge.pki;
//var publicKey = pki.publicKeyFromPem(pemKey);

//console.log(pem2jwk(pemCertificate));









/*****************************DESDE AQUI EMPIEZA ERICK */
var privJwk = crypto.createPrivateKey(`-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAptSuth+4/FT813RjEJQXkR9UszUT1x7O0gbJWQqlbZsmBoer
tOW4PGUJtaSZDcGo1SNPBD74owEcM0LPEslvyF693Z7MRrHKa2InaG3Lue0ZAuUT
3q2U0++Bbboo4c3V1sboR0+kCKlPMYeKITr6SLLxo9a1et15/QqKlpq8tj12luWo
9g2M9aY1UfNgJRt01yPr1wCViG+vB5gGJLe6Vj9GFPrCsKlXSfHnDhk+KnbUt1oE
9gwBWOKUl+/ont9pimXzzF9Y+VNEEBARpbiukDIikmO2bWuEEz1JguXZsA4toCDX
0l8j010IJvSGBTKEwqaG5w9CMN2mah8HeAiJ8wIDAQABAoIBAEwhlFTyJwWndvaP
W0HOgu6r4IgjOZmaqoD3rdyfWhyph3HFadsUVb3h0ct9gIbhkD0rbryeS/J+6DKQ
U1TcbdF/Qp+m/stoCNp2IUurhyOiih5jEW01w0vv6R18rXlV6Dap8IfSVSXKtaQB
mUxO0LZqSpEcwxZ9iVSrAdF2bZWvvA8hgtHX7niWIl/f4e5Y9R+CrVNRVU8W+OTb
NU7FafK57ZqVl5IHCBI89z6FzN9eO0NJgA6ExjLD8xlrK463X7mnwxNTwqs6Lh9D
9SPknwzXZmsnV2QuzMwo432ADdWvWg4Sa7ck/4Dw462r9DCkgYvyF7SoqnFXnoMj
UYHpF4ECgYEA0oYvCDwpGWT8+jbgcu1zhoS6jPrKE8MLONhRtFNtIfn871pjpLCf
Nztx9rPsmMvFbm0Wz6+xdtigzFvu1UVpwAVNje1+XKYPTB4b+oN4DZjUTOfl5OxY
tTVYMsbv+mNkoYb/pEqTOMOBNxAd9EzQJpKt5QWQEjDbrGdagN3Ef0ECgYEAyt5K
dzvBnC1etYDU2iTgZ6mhO9DvFilNAfxk2ettUy/X0SOgdGXuWy1mi9IqkAL26txj
3G6I/3Mq6392VDEBmoxmuRjzTcXDe16abBmvojZJSemut1udJO/FRCZJVjCRNIkf
eVk1KAALk1VhNL8UprhIGutlvPbBBFpsFGdHMDMCgYBww68tmgvprk5TOFHBPa9D
vpSuLydOroq0SCp7jLRIHr989c2pyXF/BDhnDLkOnxeBrq0pUdKc9iwrSpMDacrb
L/v6qdulhM1s2DPkW8dSgSo2h4B8vpxFc+1qRWUFmXetjcIhHlD9drsf42IoGXzl
LGw44GHrXIBOOI4huKgoAQKBgQC8XbLfC0k2bpomBb2d3+fN2R+wnsug1DCAy44J
GiSkvSOzOVVfPtYXKwywfzCuD1KduI2wu6HRL2qGyA9jFS3cBsnKzHP9nsdn4euY
vDDseWOLkcN81UAQb+HG6ZXmxanOEhR7ZG2K+p/E6d4cT+Ao/atV84S/9I48MIly
WIMtKQKBgED7iDCIHDKh3RTFKk1aZy80KKRHMJySbNHPgnqXCDkKzlWD8jgkD/iL
m3J3GccbC0r9SbcbqOvwIfcScvFtp9vy0m68VD06/SusbWK2rTNsGPS61hxSER+M
jEqxAgA6W/HNsuK46iM82IZKmQkikhThiBehz0AmvQym1F0hVJBv
-----END RSA PRIVATE KEY-----`).export({format: 'jwk'});
console.log(privJwk);

const {X509Certificate} = require('crypto')
  
// Importing fs module
  
// getting object of a PEM encoded X509 Certificate. 
const x509 = new X509Certificate(`-----BEGIN CERTIFICATE-----
MIIFpzCCA4+gAwIBAgICYAEwDQYJKoZIhvcNAQELBQAwdTELMAkGA1UEBhMCUEUx
GjAYBgNVBAoMEVN1YkNBX3hDUkwgLSBUZXN0MUowSAYDVQQDDEFBdXRvcmlkYWQg
ZGUgQ2VydGlmaWNhY2nDs24gU3Vib3JkaW5hZGEgQ1JMIG1hbCBmaXJtYWRhLVRl
c3QgMjAxOTAeFw0xOTAxMDExMDAwMDBaFw0xOTEyMzEyMzU5NTlaMHExCzAJBgNV
BAYTAlBFMRIwEAYDVQQIDAlMaW1hLUxpbWExDTALBgNVBAcMBExpbWExGjAYBgNV
BAMMETIwMTkgQ0F4Q1JMLUFGVmlnMSMwIQYJKoZIhvcNAQkBFhRhdWRpdG9yQGV2
YWxpb2ZlLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKbUrrYf
uPxU/Nd0YxCUF5EfVLM1E9ceztIGyVkKpW2bJgaHq7TluDxlCbWkmQ3BqNUjTwQ+
+KMBHDNCzxLJb8hevd2ezEaxymtiJ2hty7ntGQLlE96tlNPvgW26KOHN1dbG6EdP
pAipTzGHiiE6+kiy8aPWtXrdef0KipaavLY9dpblqPYNjPWmNVHzYCUbdNcj69cA
lYhvrweYBiS3ulY/RhT6wrCpV0nx5w4ZPip21LdaBPYMAVjilJfv6J7faYpl88xf
WPlTRBAQEaW4rpAyIpJjtm1rhBM9SYLl2bAOLaAg19JfI9NdCCb0hgUyhMKmhucP
QjDdpmofB3gIifMCAwEAAaOCAUMwggE/MA8GA1UdEwEB/wQFMAMCAQAwCwYDVR0P
BAQDAgbAMB0GA1UdJQQWMBQGCCsGAQUFBwMCBggrBgEFBQcDBDAdBgNVHQ4EFgQU
WPjlal898Q4h8jXN7uX/w1QVSPQwgYUGA1UdIwR+MHyAFL6jMNXvtuX4tRjbmg5V
dtHd0OAxoWGkXzBdMQswCQYDVQQGEwJQRTEWMBQGA1UECgwNUm9vdENBIC0gVGVz
dDE2MDQGA1UEAwwtQXV0b3JpZGFkIGRlIENlcnRpZmljYWNpw7NuIFJhw616IC0g
VGVzdCAyMDE5ggEHMB8GA1UdEQQYMBaBFGF1ZGl0b3JAZXZhbGlvZmUuY29tMDgG
A1UdHwQxMC8wLaAroCmGJ2h0dHA6Ly9nYWxlb24uY29tL2V2c2YvY3JsL2NybF94
Q1JMLmNybDANBgkqhkiG9w0BAQsFAAOCAgEAstoz/7C++8UiuukpLi4OLpECa2CT
s8OWMs2h8JYVfaPiXdwNcQhwSLD2vhLyYJMdE578g55dcHflkH5CGT8SE23Hzf4p
Cz3dVyITwCRj/EDtOhdpkPTPPBYCr5O/o92n7ev4yj+idRIzdeajtqQSlYtSfLsq
TLBLBdkVke1CLsJ++6PQfPzbmf2pb0E2auIIANXRwZuUkxIejHaLjeJSpoXigkAX
1OKSCrZG0+rUhRseCwHVp28f3Csc0N179CXpjhxwVoxSP1ugQohAsa/cfPyzXG82
t1fx9mRHeuJJXYWLqQWLaQ9IRxj+jsPnp/ssFcb4YXj2ITYPXDrf6SVsGuW8wjSu
jn9RUQn8uOTsPreFPrhrE7coxTRXcu364V+vJFiMHmarl8AStKyZkoooo7xjDkJL
RPPafvSWONDHtMDtp+XLCZ6LI+ts+LGM4l1ovzOOyui/dAfMUBmpuWnB52KObhlr
mQNuwNevhASY6poOOcTZk3t5sHDoXqUeuQoOqBb93g5YtWu0V/x2JvRlz1g9Hde1
m3ptTbaFSSdGhXxiTOVsxZG3MLjpX/8gzOFZ6KiIWJNgEWjvlJ2UR7Rjvg1KSVDJ
LGhPBt5DGtgEwmgXXkh5UDlWYZWweUWiEwC7XXCws3uKOVu2m7pO/i9AeCrNc6eQ
UCTxbl77IOguLQU=
-----END CERTIFICATE-----`);
  
// getting subject included in this certificate.
// by using x509.subject function
const value = x509.subject
  
// display the result
console.log("subject :- " + value)