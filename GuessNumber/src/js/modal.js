
export class Modal {
  constructor() {
    this.isOpen = false;
    this.modal = document.querySelector('.modal');
    this.closeIcon = this.modal.querySelector('.close');
    this.content = this.modal.querySelector('.modal__content');
  }

  toggleModal() {
    if (this.isOpen) {
      this.modal.classList.add('hidden');
    } else {
      this.modal.classList.remove('hidden');
    }
    this.isOpen = !this.isOpen;
  }

  fillContent(message, tries) {
    this.content.innerHTML = '';
    const templ = document.getElementById('win');
    const modalContent = templ.content.cloneNode(true);
    const triesNode = modalContent.querySelector('#tries');
    const messageNode = modalContent.querySelector('.message')
    messageNode.textContent = message;
    triesNode.textContent = tries;
    this.content.append(modalContent)
  }

  addListener() {
    this.modal.addEventListener('click', (event) => {
      const { target } = event;
      if (target === this.closeIcon || target !== this.content) {
        this.toggleModal();
      }
    })
  }
}