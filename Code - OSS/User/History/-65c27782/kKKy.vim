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

" Global Sets """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
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
set smartcase        " Consider case if there is an upper case character
set scrolloff=8      " Minimum number of lines to keep above and below the cursor
set colorcolumn=100  " Draws a line at the given line to keep aware of the line size
set signcolumn=yes   " Add a column on the left. Useful for linting
set cmdheight=2      " Give more space for displaying messages
set updatetime=100   " Time in milliseconds to consider the changes
set encoding=utf-8   " The encoding should be utf-8 to activate the font icons
set nobackup         " No backup files
set nowritebackup    " No backup files
set splitright       " Create the vertical splits to the right
set splitbelow       " Create the horizontal splits below
set autoread         " Update vim after file update from outside
set mouse=a          " Enable mouse support
set clipboard+=unnamedplus
filetype on          " Detect and set the filetype option and trigger the FileType Event
filetype plugin on   " Load the plugin file for the file type, if any
filetype indent on   " Load the indent file for the file type, if any

" Transparent background configuration """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
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

" Remaps """"""""""
" Remapeie teclas conforme necessário

" autocmd """"""""""
function! HighlightWordUnderCursor()
    if getline(".")[col(".")-1] !~# '[[:punct:][:blank:]]'
        exec 'match' 'Search' '/\V\<'.expand('<cword>').'\>/'
    else
        match none
    endif
endfunction

autocmd! CursorHold,CursorHoldI * call HighlightWordUnderCursor()

" AirLine """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
let g:airline#extensions#tabline#enabled = 1
let g:airline_powerline_fonts = 1

" NerdTree  """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
nnoremap <space>e :NERDTreeToggle<CR>

" Shortcuts for split navigation
map <C-h> <C-w>h
map <C-j> <C-w>j
map <C-k> <C-w>k
map <C-l> <C-w>l

" ALE """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
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

" C/C++ """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
let g:ale_c_clangformat_options = '-style={BasedOnStyle: google, IndentWidth: 4, ColumnLimit: 100, AllowShortBlocksOnASingleLine: Always, AllowShortFunctionsOnASingleLine: Inline, FixNamespaceComments: true, ReflowComments: false}'

" Para C
autocmd FileType c nnoremap <S-F10> :w<CR>:!kitty --hold sh -c "gcc % -o %:r && %:r"<CR>
autocmd FileType c inoremap <S-F10> <Esc>:w<CR>:!kitty --hold sh -c "gcc % -o %:r && %:r"<CR>
autocmd FileType c vnoremap <S-F10> <Esc>:w<CR>:!kitty --hold sh -c "gcc % -o %:r && %:r"<CR>

" Para C++
autocmd FileType cpp nnoremap <S-F10> :w<CR>:!kitty --hold sh -c "g++ % -o %:r && %:r"<CR>
autocmd FileType cpp inoremap <S-F10> <Esc>:w<CR>:!kitty --hold sh -c "g++ % -o %:r && %:r"<CR>
autocmd FileType cpp vnoremap <S-F10> <Esc>:w<CR>:!kitty --hold sh -c "g++ % -o %:r && %:r"<CR>

" NeoVim """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
if has("nvim")
    " Telescope """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
    nnoremap <leader>ff <cmd>Telescope find_files<cr>
    nnoremap <leader>fg <cmd>Telescope live_grep<cr>
    nnoremap <leader>fb <cmd>Telescope buffers<cr>
    nnoremap <leader>fh <cmd>Telescope help_tags<cr>
endif

" Navigate between buffers
nmap ty :bn<CR>
nmap tr :bp<CR>

" Delete a buffer
nmap td :bd<CR>

" Mapeamento para desfazer a última alteração com Ctrl+Z
nnoremap <C-z> u
inoremap <C-z> <C-o>u
vnoremap <C-z> <Esc>u

" Mapeamento para duplicar a linha atual com Ctrl+D
nnoremap <C-d> :t.<CR>
inoremap <C-d> <Esc>:t.<CR>gi
vnoremap <C-d> :t'><CR>gv

" Mapeamento para Ctrl+A no modo normal
nnoremap <C-a> ggVG

" Mapeamento para Ctrl+A no modo de inserção
inoremap <C-a> <C-o>ggVG

" Configuração do Ctrl+C para copiar (yank) para a área de transferência
nnoremap <C-c> "+y
vnoremap <C-c> "+y

" Configuração do Ctrl+V para colar da área de transferência
nnoremap <C-v> "+p
inoremap <C-v> <C-r>+

nnoremap <A-Right> :bnext<CR>
nnoremap <A-Left> :bprev<CR>

" Mapeamento de Tab no modo normal (indentar a linha atual)
nnoremap <Tab> >>

" Mapeamento de Shift+Tab no modo normal (desindentar a linha atual)
nnoremap <S-Tab> <<

" Mapeamento de Tab no modo visual (indentar seleção)
vnoremap <Tab> >gv

" Mapeamento de Shift+Tab no modo visual (desindentar seleção)
vnoremap <S-Tab> <gv

" Alternar se o arquivo está em edição com Ctrl+Shift+E
nnoremap <C-E> :e!<CR>
