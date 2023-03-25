import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ErrorHandllingService {
  generateError(err: any) {
    const container = `
    <div class="bg-warning container_error" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title text-success">Failed to load data</h2>
          
        </div>
        <div class="text-success">
          <p class="text-success">${err.message}</p>
        </div>
        <div class="modal-footer d-flex  justify-content-center">
          <button type="button" class="btn btn-primary"">reload page in 5</button>
        </div>
      </div>
    </div>
  </div> `;

    const range = document.createRange();
    range.selectNode(document.body);
    const fragment = range.createContextualFragment(container);
    const element = fragment.firstElementChild as Element;
    document.body.insertAdjacentElement('afterbegin', element);
    document.body.classList.add('hidden');
    setTimeout(() => {
      this.reload();
    }, 5000);
  }

  constructor() {}
  ngOnInit() {}

  reload() {
    window.location.reload();
  }
}
