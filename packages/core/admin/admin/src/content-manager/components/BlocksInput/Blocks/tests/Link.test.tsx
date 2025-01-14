import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactEditor } from 'slate-react';

import { linkBlocks } from '../Link';

import { Wrapper } from './Wrapper';

const user = userEvent.setup();

describe('Link', () => {
  beforeEach(() => {
    /**
     * @TODO: We need to find a way to use the actual implementation
     * This problem is also present at Toolbar tests
     */
    ReactEditor.findPath = jest.fn();
    ReactEditor.focus = jest.fn();
  });

  it('renders a link block properly', () => {
    render(
      linkBlocks.link.renderElement({
        children: 'Some link',
        element: {
          type: 'link',
          url: 'https://example.com',
          children: [{ type: 'text', text: 'Some link' }],
        },
        attributes: {
          'data-slate-node': 'element',
          ref: null,
        },
      }),
      {
        wrapper: Wrapper,
      }
    );

    const link = screen.getByRole('link', { name: 'Some link' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('renders a popover for each link and its opened when users click the link', async () => {
    render(
      linkBlocks.link.renderElement({
        children: 'Some link',
        element: {
          type: 'link',
          url: 'https://example.com',
          children: [
            { type: 'text', text: 'Some' },
            { type: 'text', text: ' link' },
          ],
        },
        attributes: {
          'data-slate-node': 'element',
          ref: null,
        },
      }),
      {
        wrapper: Wrapper,
      }
    );

    const link = screen.getByRole('link', { name: 'Some link' });

    expect(screen.queryByRole('button', { name: /Delete/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Edit/i })).not.toBeInTheDocument();

    await user.click(link);

    expect(screen.getByRole('button', { name: /Delete/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Edit/i })).toBeInTheDocument();
  });

  it('renders a popover for each link and its opened when users click the link', async () => {
    render(
      linkBlocks.link.renderElement({
        children: 'Some link',
        element: {
          type: 'link',
          url: 'https://example.com',
          children: [
            { type: 'text', text: 'Some' },
            { type: 'text', text: ' link' },
          ],
        },
        attributes: {
          'data-slate-node': 'element',
          ref: null,
        },
      }),
      {
        wrapper: Wrapper,
      }
    );

    const link = screen.getByRole('link', { name: 'Some link' });
    await user.click(link);
    const editButton = screen.getByLabelText(/Edit/i, { selector: 'button' });
    await user.click(editButton);

    const linkTextInput = screen.getByPlaceholderText('Enter link text');
    const saveButtons = screen.getAllByRole('button');
    expect(saveButtons[1]).toBeEnabled();

    // Remove link text and check if save button is disabled
    await userEvent.clear(linkTextInput);
    expect(saveButtons[1]).toBeDisabled();
  });
});
