import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import SettingsJson from '../assets/settings.json';


interface ISETTINGS {
    apiURL: string;
    supportedFileFormat: string[];
    
  }

class Settings implements ISETTINGS {
  apiURL: string = SettingsJson.apiURL;
  supportedFileFormat: string[] = SettingsJson.supportedFileFormat;
   }


  function fsizeValidator(control: AbstractControl): { [key: string]: boolean } | null {

    const fileExt = control.value.split('.').pop();
    const supportedFileFormats= new Settings().supportedFileFormat
    const boolv = supportedFileFormats.find(o => o == fileExt);
    if (boolv == undefined){      
      return { 'fsize': false };
      }
    const file: File = control.value
    console.log(file);
    var size = file.size
    console.log(size);
    
    


    return null;
  }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'photoholic.ui';
  
  myForm = new FormGroup({    
    file: new FormControl('', [Validators.required, fsizeValidator]),
    fileSource: new FormControl('', [Validators.required, ])
  });
  
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(private http: HttpClient) {

   }
  
  /**
   * Write code on Method
   *
   * @return response()
   */

  custom(){

  }


  get f(){
    return this.myForm.controls;
  }
  
  /**
   * Write code on Method
   *
   * @return response()
   */
  onFileChange(event:any) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });      
    }
    // console.log(event.target.files);

    // const file:File = event.target.files[0]; 
    // if (file) {  
    //     const fileName = file.name;
    //     const fileSize = file.size;
    //     const fileExt = fileName.split('.').pop();
    //     const supportedFileFormats= new Settings().supportedFileFormat;
    //     // console.log(supportedFileFormats);
    //     // console.log(typeof(fileExt));
    //     // console.log(typeof(supportedFileFormats));
        
    //     const boolv = supportedFileFormats.find(o => o == fileExt);
    //     // console.log(boolv);        
    //     if (boolv == undefined){
    //       // alert("choose correct file format");  
    //     }
    //     }

  } 
  
  /**
   * Write code on Method
   *
   * @return response()
   */

doValiation(){

  return false;
}

  submit(){
    const formData = new FormData();
    formData.append('file', this.myForm.get('fileSource')?.value);
    const apiURL = new Settings().apiURL;
    
    
    this.http.post('https://ko80ci0g68.execute-api.us-east-1.amazonaws.com/dev', formData)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
  }


}
