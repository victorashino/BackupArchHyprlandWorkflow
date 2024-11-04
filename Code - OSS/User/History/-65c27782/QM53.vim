call plug#begin()

" Plugins
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

if has('nvim')
    Plug 'nvim-lua/plenary.nvim'
    Plug 'nvim-telescope/telescope.nvim'
endif

call plug#end()

" Global Settings
syntax on
set nu
set tabstop=4
set softtabstop=4
set shiftwidth=4
set expandtab
set smarttab
set smartindent
set hidden
set incsearch
set ignorecase
set smartcase
set scrolloff=8
set colorcolumn=100
set signcolumn=yes
set cmdheight=2
set updatetime=100
set encoding=utf-8
set nobackup
set nowritebackup
set splitright
set splitbelow
set autoread
set mouse=a
set clipboard+=unnamedplus
filetype on
filetype plugin on
filetype indent on

" Transparent Background
if exists('+termguicolors')
    let &t_8f = "\<Esc>[38;2;%lu;%lu;%lum"
    let &t_8b = "\<Esc>[48;2;%lu;%lu;%lum"
    set termguicolors
endif
set background=dark
colorscheme PaperColor

if has('nvim')
    highlight Normal guibg=NONE ctermbg=NONE
    highlight EndOfBuffer guibg=NONE ctermbg=NONE
    highlight SignColumn guibg=NONE ctermbg=NONE
    highlight NormalFloat guibg=NONE ctermbg=NONE
    highlight VertSplit guibg=NONE ctermbg=NONE
endif

" Mappings
nnoremap <space>e :NERDTreeToggle<CR>
map <C-h> <C-w>h
map <C-j> <C-w>j
map <C-k> <C-w>k
map <C-l> <C-w>l

" ALE Configuration
let g:ale_linters = {
\   'python': ['flake8', 'pyright', 'bandit'],
\   'cpp': [],
\   'c': [],
\}
let g:ale_fixers = {
\   '*': ['trim_whitespace'],
\   'cpp': ['clang-format'],
\   'c': ['clang-format'],
\}
let g:ale_fix_on_save = 1
let g:ale_c_clangformat_options = '-style={BasedOnStyle: google, IndentWidth: 4, ColumnLimit: 100, AllowShortBlocksOnASingleLine: Always, AllowShortFunctionsOnASingleLine: Inline, FixNamespaceComments: true, ReflowComments: false}'

" Compile and Run for C/C++
autocmd FileType c nnoremap <S-F10> :w<CR>:!kitty --hold sh -c "gcc % -o %:r && %:r"<CR>
autocmd FileType cpp nnoremap <S-F10> :w<CR>:!kitty --hold sh -c "g++ % -o %:r && %:r"<CR>

" Telescope Configuration for Neovim
if has('nvim')
    nnoremap <leader>ff <cmd>Telescope find_files<cr>
    nnoremap <leader>fg <cmd>Telescope live_grep<cr>
    nnoremap <leader>fb <cmd>Telescope buffers<cr>
    nnoremap <leader>fh <cmd>Telescope help_tags<cr>
endif

" Buffer Navigation
nmap ty :bn<CR>
nmap tr :bp<CR>
nmap td :bd<CR>

" Custom Mappings
nnoremap <C-z> u
inoremap <C-z> <C-o>u
vnoremap <C-z> <Esc>u

nnoremap <C-d> :t.<CR>
inoremap <C-d> <Esc>:t.<CR>gi
vnoremap <C-d> :t'><CR>gv

nnoremap <C-a> ggVG
inoremap <C-a> <C-o>ggVG

nnoremap <C-c> "+y
vnoremap <C-c> "+y
nnoremap <C-v> "+p
inoremap <C-v> <C-r>+

" Tab Navigation
nnoremap <A-Right> :bnext<CR>
nnoremap <A-Left> :bprev<CR>

" Tab/Shift-Tab Indentation
nnoremap <Tab> >>
nnoremap <S-Tab> <<
vnoremap <Tab> >gv
vnoremap <S-Tab> <gv
inoremap <Tab> <Tab>
inoremap <S-Tab> <C-d>

" COC (Conquer of Completion) Settings
let g:coc_global_extensions = ['coc-snippets', 'coc-explorer', 'coc-clangd']
set encoding=utf-8
set nobackup
set updatetime=300
set signcolumn=yes

inoremap <A-1> <C-space>

inoremap <silent><expr> <TAB>
      \ coc#pum#visible() ? coc#pum#next(1) :
      \ CheckBackspace() ? "\<Tab>" :
      \ coc#refresh()

inoremap <expr><S-TAB> coc#pum#visible() ? coc#pum#prev(1) : "\<C-h>"

inoremap <silent><expr> <CR> coc#pum#visible() ? coc#pum#confirm() : "\<C-g>u\<CR>\<c-r>=coc#on_enter()\<CR>"

function! CheckBackspace() abort
    let col = col('.') - 1
    return !col || getline('.')[col - 1]  =~# '\s'
endfunction

" Trigger completion
if has('nvim')
    inoremap <silent><expr> <c-space> coc#refresh()
else
    inoremap <silent><expr> <c-@> coc#refresh()
endif

" Navigation with COC
nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> gr <Plug>(coc-references)

" Documentation Preview
nnoremap <silent> K :call CocActionAsync('doHover')<CR>
