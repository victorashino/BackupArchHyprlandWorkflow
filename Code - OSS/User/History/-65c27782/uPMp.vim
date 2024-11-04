call plug#begin()

" Aqui você pode adicionar outros plugins, caso necessário
Plug 'NLKNguyen/papercolor-theme'
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
Plug 'ryanoasis/vim-devicons'
Plug 'sheerun/vim-polyglot'
Plug 'preservim/nerdtree'
Plug 'tiagofumo/vim-nerdtree-syntax-highlight'
Plug 'Xuyuanp/nerdtree-git-plugin'
Plug 'dense-analysis/ale'
Plug 'neoclide/coc.nvim', { 'branch': 'release' }
Plug 'honza/vim-snippets'
Plug 'jiangmiao/auto-pairs'

if has("nvim")
    Plug 'nvim-lua/plenary.nvim'
    Plug 'nvim-telescope/telescope.nvim'
endif

call plug#end()

" Global Sets
syntax on            " Enable syntax highlight
set nu               " Enable line numbers
set tabstop=4        " Show existing tab with 4 spaces width
set softtabstop=4    " Show existing tab with 4 spaces width
set shiftwidth=4     " When indenting with '>', use 4 spaces width
set expandtab        " On pressing tab, insert 4 spaces
set smarttab         " Insert tabs on the start of a line according to shiftwidth
set smartindent      " Automatically inserts one extra level of indentation in some cases
set hidden           " Hides the current buffer when a new file is opened
set incsearch        " Incremental search
set ignorecase       " Ignore case in search
set smartcase        " Consider case if there is an uppercase character
set scrolloff=8      " Minimum number of lines to keep above and below the cursor
set colorcolumn=100  " Draws a line at the given column to keep aware of line size
set signcolumn=yes   " Add a column on the left. Useful for linting
set cmdheight=2      " Give more space for displaying messages
set updatetime=100   " Time in milliseconds to consider changes
set encoding=utf-8   " The encoding should be UTF-8 to activate the font icons
set nobackup         " No backup files
set nowritebackup    " No write backup files
set splitright       " Create vertical splits to the right
set splitbelow       " Create horizontal splits below
set autoread         " Update vim after file update from outside
set mouse=a          " Enable mouse support
set clipboard+=unnamedplus
filetype on          " Detect and set the filetype option
filetype plugin on   " Load the plugin file for the file type
filetype indent on   " Load the indent file for the file type

" Transparent background configuration
if exists('+termguicolors')
  let &t_8f = "\<Esc>[38;2;%lu;%lu;%lum"
  let &t_8b = "\<Esc>[48;2;%lu;%lu;%lum"
  set termguicolors
endif

set background=dark
colorscheme PaperColor

" Definir transparência para várias áreas
if has("nvim")
    highlight Normal guibg=NONE ctermbg=NONE
    highlight EndOfBuffer guibg=NONE ctermbg=NONE
    highlight SignColumn guibg=NONE ctermbg=NONE
    highlight NormalFloat guibg=NONE ctermbg=NONE
    highlight VertSplit guibg=NONE ctermbg=NONE
endif

" Remaps
nnoremap <space>e :NERDTreeToggle<CR>

" Shortcuts for split navigation
map <C-h> <C-w>h
map <C-j> <C-w>j
map <C-k> <C-w>k
map <C-l> <C-w>l

" ALE Configuration
let g:ale_linters = {
\ 'python': ['flake8', 'pyright', 'bandit'],
\ 'cpp': [],
\ 'c': [],
\}

let g:ale_fixers = {
\   '*': ['trim_whitespace'],
\   'cpp': ['clang-format'],
\   'c': ['clang-format'],
\}

let g:ale_fix_on_save = 1

" C/C++ Compilation and Execution Mappings
let g:ale_c_clangformat_options = '-style={BasedOnStyle: google, IndentWidth: 4, ColumnLimit: 100, AllowShortBlocksOnASingleLine: Always, AllowShortFunctionsOnASingleLine: Inline, FixNamespaceComments: true, ReflowComments: false}'

autocmd FileType c nnoremap <S-F10> :w<CR>:!kitty --hold sh -c "gcc % -o %:r && %:r"<CR>
autocmd FileType cpp nnoremap <S-F10> :w<CR>:!kitty --hold sh -c "g++ % -o %:r && %:r"<CR>

" NeoVim Specific Configurations
if has("nvim")
    " Telescope Mappings
    nnoremap <leader>ff <cmd>Telescope find_files<cr>
    nnoremap <leader>fg <cmd>Telescope live_grep<cr>
    nnoremap <leader>fb <cmd>Telescope buffers<cr>
    nnoremap <leader>fh <cmd>Telescope help_tags<cr>
endif

" Buffer Navigation
nmap ty :bn<CR>
nmap tr :bp<CR>
nmap td :bd<CR>

" Undo Mappings
nnoremap <C-z> u
inoremap <C-z> <C-o>u
vnoremap <C-z> <Esc>u

" Duplicate Line Mappings
nnoremap <C-d> :t.<CR>
inoremap <C-d> <Esc>:t.<CR>gi
vnoremap <C-d> :t'><CR>gv

" Select All with Ctrl+A in Normal and Insert Mode
nnoremap <C-a> ggVG
inoremap <C-a> <C-o>ggVG

" Copy and Paste Mappings
nnoremap <C-c> "+y
vnoremap <C-c> "+y
nnoremap <C-v> "+p
inoremap <C-v> <C-r>+

" Tab Indentation Mappings
nnoremap <Tab> >>
nnoremap <S-Tab> <<
vnoremap <Tab> >gv
vnoremap <S-Tab> <gv>
inoremap <Tab> <Tab>
inoremap <S-Tab> <C-d>

" COC (Conquer of Completion) Configuration
let g:coc_global_extensions = ['coc-snippets', 'coc-explorer', 'coc-clangd']

set encoding=utf-8
set nobackup
set nowritebackup
set updatetime=300
set signcolumn=yes

inoremap <silent><expr> <TAB>
      \ coc#pum#visible() ? coc#pum#next(1) :
      \ CheckBackspace() ? "\<Tab>" :
      \ coc#refresh()

inoremap <expr><S-TAB> coc#pum#visible() ? coc#pum#prev(1) : "\<C-h>"

inoremap <silent><expr> <CR> coc#pum#visible() ? coc#pum#confirm()
                              \: "\<C-g>u\<CR>\<c-r>=coc#on_enter()\<CR>"

function! CheckBackspace() abort
  let col = col('.') - 1
  return !col || getline('.')[col - 1]  =~# '\s'
endfunction

if has('nvim')
  inoremap <silent><expr> <c-space> coc#refresh()
else
  inoremap <silent><expr> <c-@> coc#refresh()
endif

" Diagnostics Navigation
nmap <silent> [g <Plug>(coc-diagnostic-prev)
nmap <silent> ]g <Plug>(coc-diagnostic-next)

" Code Navigation
nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> gr <Plug>(coc-references)

" Show Documentation
nnoremap <silent> K :call ShowDocumentation()<CR>

function! ShowDocumentation()
  if CocAction('hasProvider', 'hover')
    call CocActionAsync('doHover')
  else
    call feedkeys('K', 'in')
  endif
endfunction
