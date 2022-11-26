import React from 'react'
import forge from 'node-forge'
import rsaPemToJwk from 'rsa-pem-to-jwk'
import crypto from 'crypto'


// import fs from 'fs'

function leerArchivo(e) {
	var archivo = e.target.files[0];
	var password = document.getElementById('pass').value;
	if (!archivo) {
		return;
	}

	if (password == "") {
		alert("ingrese una contraseña");
		return;
	}

	var lector = new FileReader();
	lector.onload = function (e) {

		// console.log(password);
		var contenido = e.target.result;
		var p12Asn1 = forge.asn1.fromDer(contenido, false);
		var pkcs12 = null;
		try {
			pkcs12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, password);
		} catch (error) {
			alert('Ingrese la contraseña correcta y vuelva a subir el archivo');
			document.getElementById('pass').value = "";
			return;
		}

		var map = {};
		for (var sci = 0; sci < pkcs12.safeContents.length; ++sci) {
			var safeContents = pkcs12.safeContents[sci];

			for (var sbi = 0; sbi < safeContents.safeBags.length; ++sbi) {
				var safeBag = safeContents.safeBags[sbi];

				var localKeyId = null;
				if (safeBag.attributes.localKeyId) {
					localKeyId = forge.util.bytesToHex(
						safeBag.attributes.localKeyId[0]);
					if (!(localKeyId in map)) {
						map[localKeyId] = {
							privateKey: null,
							certChain: []
						};
					}
				} else {
					continue;
				}

				if (safeBag.type === forge.pki.oids.pkcs8ShroudedKeyBag) {
					map[localKeyId].privateKey = safeBag.key;
				} else if (safeBag.type === forge.pki.oids.certBag) {
					map[localKeyId].certChain.push(safeBag.cert);
				}
			}
		}
		for (var localKeyId in map) {
			var entry = map[localKeyId];
			if (entry.privateKey) {
				var privateKeyP12Pem = forge.pki.privateKeyToPem(entry.privateKey);
				// privateKeyP12Pem += '\n';
				// console.log(privateKeyP12Pem);
				// var jwk = rsaPemToJwk(privateKeyP12Pem, { use: 'sig' }, 'public');
			
				// console.log(jwk);

				var privJwk = crypto.createPrivateKey(privateKeyP12Pem).export({format: 'jwk'});
				// console.log(privJwk);
				mostrarContenido(privateKeyP12Pem);
				
				// const jwk = rsaPemToJwk(privateKeyP12Pem);
			}
			if (entry.certChain.length > 0) {
				var certChain = entry.certChain;
				var certifcados = "";
				for (var i = 0; i < certChain.length; ++i) {
					var certP12Pem = forge.pki.certificateToPem(certChain[i]);
					const x509 = new X509Certificate(certP12Pem);
					const value = x509.subject
					// console.log("subject :- ")
					certifcados += '\n';
					certifcados += certP12Pem;
				}
				mostrarContenidoCerti(certifcados);
			}
		}
	};
	lector.readAsBinaryString(archivo);
}

function mostrarContenido(contenido) {
	var elemento = document.getElementById('contenido-archivo');
	elemento.innerHTML = contenido;
}

function mostrarContenidoCerti(contenido) {
	var elemento = document.getElementById('certis');
	elemento.innerHTML = contenido;
}
// document.getElementById('file-input')
// 	.addEventListener('change', leerArchivo, false);

function App() {
	return (
		<div className='bg-slate-700 h-screen py-10'>
			<div className='flex justify-center'>
				<h1 className=' bg-slate-800 py-10 text-center text-6xl text-white font-sans font-extrabold w-9/12 rounded-2xl'>
					Visualizacion de archivos PKCS#12
				</h1>
			</div>
			<div className='bg-gray-900 w-3/6 py-8 my-8 mx-auto text-white rounded-lg px-8 '>
				<div className='flex flex-col text-gray-400 py-2 text-2xl'>
					<label>Ingrese archivo: </label>
					<input type="file" id="file-input" onChange={leerArchivo} />
				</div>
				<div className='flex flex-col text-gray-400 py-2 text-2xl'>
					<label>Ingrese contraseña: </label>
					<input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none px-4' type="text" id='pass' />
				</div>
				{/* <button 
					className='w-full my-5 py-4 text-2xl  bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/10 text-white font-semibold rounded-lg'
				>
					Visualizar
				</button> */}
			</div>

			<div className='bg-gray-900 flex flex-row text-white'>
				<div className='bg-gray-800 flex-auto w-5/12 rounded-lg m-4  mr-0 py-2 px-4'>
					<h3 className='text-xl my-4'>Campos de la llave privada:</h3>
					<pre id="contenido-archivo"></pre>
				</div>
				<div className='bg-gray-800 flex-auto w-5/12 rounded-lg m-4  mr-0 py-2 px-4'>
					<h3 className='text-xl my-4'>Certificados Digitales:</h3>
					<pre id="certis"></pre>
				</div>
			</div>
		</div>
	)
}

export default App