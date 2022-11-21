import { async } from '@angular/core/testing';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-google-drive-iface',
  templateUrl: './app-google-drive-iface.component.html',
  styleUrls: ['./app-google-drive-iface.component.css']
})
export class AppGoogleDriveIfaceComponent implements OnInit, AfterViewInit {

  // TODO(developer): Set to client ID and API key from the Developer Console
  private CLIENT_ID = '';
  private API_KEY = '';
  // Discovery doc URL for APIs used by the quickstart
  private DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  private SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

  private tokenClient: google.accounts.oauth2.TokenClient | null = null;
  private gapiInited = false;
  private gisInited = false;
  private authButtonElem: HTMLElement | null = null;
  private signoutButtonElem: HTMLElement | null = null;
  private contentElem: HTMLElement | null = null;

  constructor() { }

  ngOnInit() {
    this.CLIENT_ID = environment.app_client_id;
    this.API_KEY = environment.app_api_key;

    this.authButtonElem = document.getElementById('authorize_button');
    if (this.authButtonElem) {
        this.authButtonElem.style.visibility = 'hidden';
    }
    this.signoutButtonElem = document.getElementById('signout_button');
    if (this.signoutButtonElem) {
      this.signoutButtonElem.style.visibility = 'hidden';
    }
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }

  /**
   * Callback after api.js is loaded.
   */
  gapiLoaded() {
    gapi.load('client', this.initializeGapiClient);
  }

    /**
     * Callback after the API client is loaded. Loads the
     * discovery doc to initialize the API.
     */
    async initializeGapiClient() {
      await gapi.client.init({
        apiKey: this.API_KEY,
        discoveryDocs: [this.DISCOVERY_DOC],
      });
      this.gapiInited = true;
      this.maybeEnableButtons();
    }




    /**
     * Callback after Google Identity Services are loaded.
     */
    gisLoaded() {
      const tokenCallback = async (resp: google.accounts.oauth2.TokenResponse) => {
        if (resp.error !== undefined) {
          throw (resp);
        }
        if (this.authButtonElem)
        this.authButtonElem.style.visibility = 'visible';
        if (this.signoutButtonElem)
        this.signoutButtonElem.innerText = 'Refresh';
        await this.listFiles();
      };
      this.tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: this.CLIENT_ID,
        scope: this.SCOPES,
        callback: tokenCallback, // defined later
      });
      this.gisInited = true;
      this.maybeEnableButtons();
    }

    /**
     * Enables user interaction after all libraries are loaded.
     */
    maybeEnableButtons() {
      if (this.gapiInited && this.gisInited) {
        if (this.authButtonElem) {
          this.authButtonElem.style.visibility = 'visible';
        }
      }
    }

    /**
     *  Sign in the user upon button click.
     */
    handleAuthClick() {
      if (this.tokenClient == null) {
        return;
      }

      if (gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        this.tokenClient.requestAccessToken({prompt: 'consent'});
      } else {
        // Skip display of account chooser and consent dialog for an existing session.
        this.tokenClient.requestAccessToken({prompt: ''});
      }
    }

    /**
     *  Sign out the user upon button click.
     */
    handleSignoutClick() {
      const token = gapi.client.getToken();
      if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token, ()=> {});
        gapi.client.setToken(null);
        this.contentElem = document.getElementById('content');
        if (this.contentElem)
          this.contentElem.innerText = '';
        if (this.authButtonElem)
        this.authButtonElem.innerText = 'Authorize';
        if (this.signoutButtonElem)
        this.signoutButtonElem.style.visibility = 'hidden';
      }
    }

    /**
     * Print metadata for first 10 files.
     */
    async listFiles() {
      let response;
      try {
        response = await gapi.client.drive.files.list({
          'pageSize': 10,
          'fields': 'files(id, name)',
        });
      } catch (err: any) {
        if (this.contentElem)
        this.contentElem.innerText = err.message;
        return;
      }
      const files = response.result.files;
      if (!files || files.length == 0) {
        if (this.contentElem)
        this.contentElem.innerText = 'No files found.';
        return;
      }
      // Flatten to string to display
      const output = files.reduce(
          (str, file) => `${str}${file.name} (${file.id}\n`,
          'Files:\n');
      if (this.contentElem)
      this.contentElem.innerText = output;
    }

}
