import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { expect, describe, test, vi } from 'vitest';
import Button from './Button.svelte';

function setupTest(args = {}) {
  const user = userEvent.setup();
  const onClick = vi.fn();
  const { component } = render(Button, { props: { ...args } });
  component.$on('click', onClick);
  const button = screen.getByRole('button');
  return {
    user,
    component,
    onClick,
    button,
  };
}

describe('Button Component Tests', () => {
  test('Default Button', async () => {
    const { user, button, onClick } = setupTest({ label: 'Next' });
    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  test('Small Button', async () => {
    const { user, button, onClick } = setupTest({ label: 'Small Button', size: 'sm' });
    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  test('Large Button', async () => {
    const { user, button, onClick } = setupTest({ label: 'Large Button', size: 'lg' });
    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  test('Extra Large Button', async () => {
    const { user, button, onClick } = setupTest({ label: 'Extra Large Button', size: 'xl' });
    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  test('Alert Button', async () => {
    const { user, button, onClick } = setupTest({ label: 'Archive', alert: true });
    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  test('Danger Button', async () => {
    const { user, button, onClick } = setupTest({ label: 'Delete Forever', danger: true });
    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  test('Deemphasized Button', async () => {
    const { user, button, onClick } = setupTest({ label: 'Cancel', deemphasized: true });
    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  test('Full Width Button', async () => {
    const { user, button, onClick } = setupTest({ label: 'Full Width Button', size: 'full' });
    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  test('Disabled Button', async () => {
    const { button, onClick } = setupTest({ label: 'Place Order', disabled: true });
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  test('Light Button', async () => {
    const { user, button, onClick } = setupTest({ label: 'Button', lightbtn: true });
    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  test('Default Stroke Button', async () => {
    const { user, button, onClick } = setupTest({ label: 'Stroke Button', strokebtn: true });
    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  test('Alert Stroke Button', async () => {
    const { user, button, onClick } = setupTest({ label: 'Alert Button', alert: true, strokebtn: true });
    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  test('Danger Stroke Button', async () => {
    const { user, button, onClick } = setupTest({ label: 'Danger Button', danger: true, strokebtn: true });
    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  test('Renders with before and after icons', () => {
    const { button } = setupTest({ beforeIcon: 'icon-before.png', afterIcon: 'icon-after.png' });
  
    const beforeIcon = button.querySelector('img.mr-2');
    const afterIcon = button.querySelector('img.ml-2');
  
    expect(beforeIcon).toBeInTheDocument();
    expect(beforeIcon).toHaveAttribute('src', 'icon-before.png');
  
    expect(afterIcon).toBeInTheDocument();
    expect(afterIcon).toHaveAttribute('src', 'icon-after.png');
  });
  

  test('Renders Button with default props', () => {
    const { button } = setupTest();
    expect(button).toBeInTheDocument();
  });

  test('Applies correct class for "danger" prop', () => {
    const { button } = setupTest({ danger: true });
    expect(button).toHaveClass('btn-danger');
  });

  test('Applies correct class for "alert" prop', () => {
    const { button } = setupTest({ alert: true });
    expect(button).toHaveClass('btn-alert');
  });

  test('Handles click event', async () => {
    const { user, button, onClick } = setupTest();
    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  test('Disables button when "disabled" prop is true', async () => {
    const { button, onClick } = setupTest({ disabled: true });
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  test('Applies correct size class when "size" prop is provided', () => {
    const { button } = setupTest({ size: 'lg' });
    expect(button).toHaveClass('px-4 py-2 text-base');
  });

  test('Handles custom classes passed via "className" prop', () => {
    const { button } = setupTest({ className: 'custom-class' });
    expect(button).toHaveClass('custom-class');
  });
});
