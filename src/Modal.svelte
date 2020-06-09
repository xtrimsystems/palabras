<script>
    import { createEventDispatcher, onDestroy } from 'svelte';

    import { i18nStore } from './Stores/I18nStore.ts';

    const dispatch = createEventDispatcher();
    const close = () => dispatch('close');

    let modal;

    const handle_keydown = e => {
        if (e.key === 'Escape') {
            close();
            return;
        }

        if (e.key === 'Tab') {
            const nodes = modal.querySelectorAll('*');
            const tabbable = Array.from(nodes).filter(n => n.tabIndex >= 0);

            let index = tabbable.indexOf(document.activeElement);
            if (index === -1 && e.shiftKey) index = 0;

            index += tabbable.length + (e.shiftKey ? -1 : 1);
            index %= tabbable.length;

            tabbable[index].focus();
            e.preventDefault();
        }
    };

    const previously_focused = typeof document !== 'undefined' && document.activeElement;

    if (previously_focused) {
        onDestroy(() => {
            previously_focused.focus();
        });
    }
</script>

<svelte:window on:keydown={handle_keydown}/>

<div class="modal-background" on:click={close}></div>

<div class="modal" role="dialog" aria-modal="true" bind:this={modal}>
    <div class="modal-header">
        <slot class="modal-title" name="header"></slot>
        <button type="button" class="close" on:click={close}>
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
        <slot></slot>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" on:click={close}>{$i18nStore.texts.close}</button>
        <slot name="cta"></slot>
    </div>
</div>

<style>
    .modal-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        z-index: 1;
    }

    .modal {
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 32rem;
        height: auto;
        transform: translate(-50%,-50%);
        overflow: auto;
        padding: 1em;
        border-radius: 0.2em;
        background: var(--white);
        box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0,0,0,.12);
    }

    @media (max-width: 1200px) {
        .modal {
            width: calc(100% - 2rem);
        }
    }
</style>
