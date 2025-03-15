document.addEventListener('DOMContentLoaded', function() {
    // SQL commands data
    const sqlCommands = {
        "statements": [
            {
                "category": "查詢語句",
                "type": "query",
                "commands": [
                    {
                        "command": "select",
                        "title": "SELECT",
                        "description": "從一個或多個表中檢索資料。",
                        "syntax": "SELECT column1, column2, ...\nFROM table_name\n[WHERE condition]\n[ORDER BY column1, column2, ... ASC|DESC]\n[LIMIT number];",
                        "examples": [
                            {
                                "title": "選擇所有列",
                                "code": "SELECT * FROM table_name;"
                            },
                            {
                                "title": "選擇特定列",
                                "code": "SELECT column1, column2, column3 FROM table_name;"
                            },
                            {
                                "title": "使用 WHERE 子句",
                                "code": "SELECT * FROM table_name WHERE condition;"
                            }
                        ]
                    },
                    {
                        "command": "where",
                        "title": "WHERE",
                        "description": "過濾查詢結果，只返回符合條件的記錄。",
                        "syntax": "SELECT column1, column2, ...\nFROM table_name\nWHERE condition;",
                        "examples": [
                            {
                                "title": "基本比較",
                                "code": "SELECT * FROM products WHERE price > 100;"
                            },
                            {
                                "title": "多條件（AND、OR）",
                                "code": "SELECT * FROM customers WHERE country = 'USA' AND (city = 'New York' OR city = 'Los Angeles');"
                            },
                            {
                                "title": "模糊查詢（LIKE）",
                                "code": "SELECT * FROM employees WHERE name LIKE 'A%';"
                            }
                        ]
                    },
                    {
                        "command": "join",
                        "title": "JOIN",
                        "description": "基於相關欄位將兩個或多個表中的記錄組合起來。",
                        "syntax": "SELECT columns\nFROM table1\n[INNER | LEFT | RIGHT | FULL] JOIN table2\nON table1.column = table2.column;",
                        "examples": [
                            {
                                "title": "INNER JOIN",
                                "code": "SELECT orders.order_id, customers.customer_name\nFROM orders\nINNER JOIN customers ON orders.customer_id = customers.customer_id;"
                            },
                            {
                                "title": "LEFT JOIN",
                                "code": "SELECT customers.customer_name, orders.order_id\nFROM customers\nLEFT JOIN orders ON customers.customer_id = orders.customer_id;"
                            },
                            {
                                "title": "RIGHT JOIN",
                                "code": "SELECT orders.order_id, employees.last_name\nFROM orders\nRIGHT JOIN employees ON orders.employee_id = employees.employee_id;"
                            }
                        ]
                    },
                    {
                        "command": "orderby",
                        "title": "ORDER BY",
                        "description": "對查詢結果按一個或多個列進行排序。",
                        "syntax": "SELECT column1, column2, ...\nFROM table_name\nORDER BY column1 [ASC|DESC], column2 [ASC|DESC], ...;",
                        "examples": [
                            {
                                "title": "升序排序（預設）",
                                "code": "SELECT * FROM products ORDER BY price ASC;"
                            },
                            {
                                "title": "降序排序",
                                "code": "SELECT * FROM products ORDER BY price DESC;"
                            },
                            {
                                "title": "多列排序",
                                "code": "SELECT * FROM employees ORDER BY department ASC, salary DESC;"
                            }
                        ]
                    },
                    {
                        "command": "groupby",
                        "title": "GROUP BY",
                        "description": "將查詢結果按一個或多個列進行分組，通常與聚合函數一起使用。",
                        "syntax": "SELECT column1, aggregate_function(column2)\nFROM table_name\nGROUP BY column1;\n\n# 常見聚合函數: COUNT(), SUM(), AVG(), MAX(), MIN()",
                        "examples": [
                            {
                                "title": "計算每個類別的產品數量",
                                "code": "SELECT category, COUNT(*) as product_count\nFROM products\nGROUP BY category;"
                            },
                            {
                                "title": "計算每個國家的客戶數量",
                                "code": "SELECT country, COUNT(*) as customer_count\nFROM customers\nGROUP BY country\nORDER BY customer_count DESC;"
                            }
                        ]
                    },
                    {
                        "command": "having",
                        "title": "HAVING",
                        "description": "用於過濾分組後的結果，類似於 WHERE 但用於 GROUP BY 之後。",
                        "syntax": "SELECT column1, aggregate_function(column2)\nFROM table_name\nGROUP BY column1\nHAVING condition;",
                        "examples": [
                            {
                                "title": "查找產品數量大於 5 的類別",
                                "code": "SELECT category, COUNT(*) as product_count\nFROM products\nGROUP BY category\nHAVING product_count > 5;"
                            },
                            {
                                "title": "查找平均價格大於 100 的類別",
                                "code": "SELECT category, AVG(price) as avg_price\nFROM products\nGROUP BY category\nHAVING avg_price > 100;"
                            }
                        ]
                    },
                    {
                        "command": "limit",
                        "title": "LIMIT",
                        "description": "限制查詢結果的行數。",
                        "syntax": "SELECT column1, column2, ...\nFROM table_name\nLIMIT number;",
                        "examples": [
                            {
                                "title": "獲取前 10 筆資料",
                                "code": "SELECT * FROM products LIMIT 10;"
                            },
                            {
                                "title": "分頁查詢（跳過前 10 筆，取接下來的 10 筆）",
                                "code": "SELECT * FROM products LIMIT 10 OFFSET 10;"
                            }
                        ]
                    }
                ]
            },
            {
                "category": "資料操作語句",
                "type": "dml",
                "commands": [
                    {
                        "command": "insert",
                        "title": "INSERT INTO",
                        "description": "向表中插入新記錄。",
                        "syntax": "# 語法 1: 指定列和值\nINSERT INTO table_name (column1, column2, ...)\nVALUES (value1, value2, ...);\n\n# 語法 2: 插入全部列\nINSERT INTO table_name\nVALUES (value1, value2, ...);",
                        "examples": [
                            {
                                "title": "插入一條記錄（指定列）",
                                "code": "INSERT INTO customers (customer_name, contact_name, country)\nVALUES ('ABC Inc.', 'John Smith', 'USA');"
                            },
                            {
                                "title": "插入一條記錄（所有列）",
                                "code": "INSERT INTO customers\nVALUES (1, 'ABC Inc.', 'John Smith', 'New York', 'USA');"
                            },
                            {
                                "title": "插入多條記錄",
                                "code": "INSERT INTO products (product_name, price, category)\nVALUES\n('Laptop', 1200, 'Electronics'),\n('Desk', 350, 'Furniture'),\n('Phone', 800, 'Electronics');"
                            }
                        ]
                    },
                    {
                        "command": "update",
                        "title": "UPDATE",
                        "description": "修改表中已存在的記錄。",
                        "syntax": "UPDATE table_name\nSET column1 = value1, column2 = value2, ...\nWHERE condition;",
                        "examples": [
                            {
                                "title": "更新單一記錄",
                                "code": "UPDATE customers\nSET contact_name = 'Alfred Schmidt'\nWHERE customer_id = 1;"
                            },
                            {
                                "title": "更新多列",
                                "code": "UPDATE products\nSET price = price * 1.1, last_update = CURRENT_DATE\nWHERE category = 'Electronics';"
                            },
                            {
                                "title": "更新所有記錄",
                                "code": "UPDATE products\nSET available = TRUE;"
                            }
                        ]
                    },
                    {
                        "command": "delete",
                        "title": "DELETE",
                        "description": "從表中刪除記錄。",
                        "syntax": "DELETE FROM table_name\nWHERE condition;",
                        "examples": [
                            {
                                "title": "刪除特定記錄",
                                "code": "DELETE FROM customers\nWHERE customer_name = 'Alfreds Futterkiste';"
                            },
                            {
                                "title": "刪除多條記錄",
                                "code": "DELETE FROM products\nWHERE price < 10 OR category = 'Discontinued';"
                            },
                            {
                                "title": "刪除所有記錄",
                                "code": "DELETE FROM order_details;"
                            }
                        ]
                    }
                ]
            },
            {
                "category": "資料定義語句",
                "type": "ddl",
                "commands": [
                    {
                        "command": "create",
                        "title": "CREATE TABLE",
                        "description": "創建新表。",
                        "syntax": "CREATE TABLE table_name (\n    column1 datatype constraints,\n    column2 datatype constraints,\n    ...\n    PRIMARY KEY (column)\n);",
                        "examples": [
                            {
                                "title": "創建基本表",
                                "code": "CREATE TABLE customers (\n    customer_id INT PRIMARY KEY,\n    customer_name VARCHAR(100) NOT NULL,\n    contact_name VARCHAR(100),\n    country VARCHAR(50)\n);"
                            },
                            {
                                "title": "創建帶外鍵的表",
                                "code": "CREATE TABLE orders (\n    order_id INT PRIMARY KEY,\n    customer_id INT,\n    order_date DATE,\n    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)\n);"
                            }
                        ]
                    },
                    {
                        "command": "alter",
                        "title": "ALTER TABLE",
                        "description": "修改現有表的結構。",
                        "syntax": "# 添加列\nALTER TABLE table_name\nADD column_name datatype;\n\n# 刪除列\nALTER TABLE table_name\nDROP COLUMN column_name;\n\n# 修改列類型\nALTER TABLE table_name\nMODIFY COLUMN column_name datatype;",
                        "examples": [
                            {
                                "title": "添加列",
                                "code": "ALTER TABLE customers\nADD email VARCHAR(100);"
                            },
                            {
                                "title": "刪除列",
                                "code": "ALTER TABLE customers\nDROP COLUMN fax;"
                            },
                            {
                                "title": "修改列數據類型",
                                "code": "ALTER TABLE products\nMODIFY COLUMN price DECIMAL(10,2);"
                            }
                        ]
                    },
                    {
                        "command": "drop",
                        "title": "DROP TABLE",
                        "description": "刪除表及其所有數據。",
                        "syntax": "DROP TABLE table_name;",
                        "examples": [
                            {
                                "title": "刪除表",
                                "code": "DROP TABLE customers;"
                            },
                            {
                                "title": "安全刪除表（如果存在）",
                                "code": "DROP TABLE IF EXISTS customers;"
                            }
                        ]
                    }
                ]
            },
            {
                "category": "事務控制語句",
                "type": "tcl",
                "commands": [
                    {
                        "command": "transaction",
                        "title": "BEGIN TRANSACTION",
                        "description": "開始一個事務。",
                        "syntax": "BEGIN TRANSACTION;",
                        "examples": [
                            {
                                "title": "開始事務",
                                "code": "BEGIN TRANSACTION;"
                            }
                        ]
                    },
                    {
                        "command": "commit",
                        "title": "COMMIT",
                        "description": "提交事務，保存所有更改。",
                        "syntax": "COMMIT;",
                        "examples": [
                            {
                                "title": "提交事務",
                                "code": "COMMIT;"
                            },
                            {
                                "title": "完整事務示例",
                                "code": "BEGIN TRANSACTION;\n\nUPDATE accounts SET balance = balance - 100 WHERE account_id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE account_id = 2;\n\nCOMMIT;"
                            }
                        ]
                    },
                    {
                        "command": "rollback",
                        "title": "ROLLBACK",
                        "description": "回滾事務，撤銷所有更改。",
                        "syntax": "ROLLBACK;",
                        "examples": [
                            {
                                "title": "回滾事務",
                                "code": "ROLLBACK;"
                            },
                            {
                                "title": "帶錯誤處理的事務",
                                "code": "BEGIN TRANSACTION;\n\nUPDATE inventory SET quantity = quantity - 5 WHERE product_id = 101;\n\n-- 檢查庫存是否足夠\nIF (SELECT quantity FROM inventory WHERE product_id = 101) < 0 THEN\n    ROLLBACK;\n    SELECT 'Insufficient inventory';\nELSE\n    INSERT INTO orders (product_id, quantity) VALUES (101, 5);\n    COMMIT;\nEND IF;"
                            }
                        ]
                    }
                ]
            },
            {
                "category": "進階操作",
                "type": "advanced",
                "commands": [
                    {
                        "command": "union",
                        "title": "UNION",
                        "description": "合併兩個或多個 SELECT 語句的結果，並去除重複行。",
                        "syntax": "SELECT column1, column2, ...\nFROM table1\nUNION\nSELECT column1, column2, ...\nFROM table2;",
                        "examples": [
                            {
                                "title": "合併兩個查詢結果",
                                "code": "SELECT city FROM customers\nUNION\nSELECT city FROM suppliers\nORDER BY city;"
                            },
                            {
                                "title": "保留重複行（UNION ALL）",
                                "code": "SELECT city FROM customers\nUNION ALL\nSELECT city FROM suppliers\nORDER BY city;"
                            }
                        ]
                    },
                    {
                        "command": "subquery",
                        "title": "子查詢 (Subquery)",
                        "description": "在 SQL 查詢中嵌套另一個查詢。",
                        "syntax": "SELECT column1, column2, ...\nFROM table1\nWHERE column1 operator (SELECT column1 FROM table2 WHERE condition);",
                        "examples": [
                            {
                                "title": "使用子查詢作為條件",
                                "code": "SELECT * FROM products\nWHERE price > (SELECT AVG(price) FROM products);"
                            },
                            {
                                "title": "使用子查詢作為臨時表",
                                "code": "SELECT * FROM (SELECT product_id, product_name, price FROM products WHERE category = 'Electronics') AS electronic_products\nWHERE price > 500;"
                            }
                        ]
                    },
                    {
                        "command": "index",
                        "title": "索引 (Index)",
                        "description": "提高數據庫性能的資料結構，加速數據檢索操作。",
                        "syntax": "CREATE INDEX index_name\nON table_name (column1, column2, ...);",
                        "examples": [
                            {
                                "title": "創建基本索引",
                                "code": "CREATE INDEX idx_lastname\nON employees (last_name);"
                            },
                            {
                                "title": "創建唯一索引",
                                "code": "CREATE UNIQUE INDEX idx_product_name\nON products (product_name);"
                            },
                            {
                                "title": "創建組合索引",
                                "code": "CREATE INDEX idx_name_city\nON customers (customer_name, city);"
                            }
                        ]
                    },
                    {
                        "command": "view",
                        "title": "視圖 (View)",
                        "description": "基於 SQL 查詢的虛擬表，可以像操作普通表一樣操作視圖。",
                        "syntax": "CREATE VIEW view_name AS\nSELECT column1, column2, ...\nFROM table_name\nWHERE condition;",
                        "examples": [
                            {
                                "title": "創建簡單視圖",
                                "code": "CREATE VIEW usa_customers AS\nSELECT * FROM customers\nWHERE country = 'USA';"
                            },
                            {
                                "title": "使用視圖",
                                "code": "SELECT * FROM usa_customers;"
                            },
                            {
                                "title": "創建連接視圖",
                                "code": "CREATE VIEW order_details_view AS\nSELECT o.order_id, c.customer_name, o.order_date\nFROM orders o\nINNER JOIN customers c ON o.customer_id = c.customer_id;"
                            }
                        ]
                    }
                ]
            }
        ]
    };

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check for saved theme preference or use OS preference
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    
    themeToggle.addEventListener('click', function() {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Render SQL commands
    const commandsContainer = document.querySelector('.grid');
    
    function renderCommands(filter = 'all') {
        commandsContainer.innerHTML = '';
        
        sqlCommands.statements.forEach(category => {
            if (filter !== 'all' && category.type !== filter) return;
            
            // Category header
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'col-span-1 md:col-span-2 mt-2 mb-2';
            categoryHeader.innerHTML = `
                <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                    ${category.category}
                </h2>
            `;
            commandsContainer.appendChild(categoryHeader);
            
            // Commands
            category.commands.forEach(command => {
                const commandItem = document.createElement('div');
                commandItem.className = 'command-item bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden';
                commandItem.setAttribute('data-command', command.command);
                commandItem.innerHTML = `
                    <div class="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#252525]">
                        <h3 class="font-medium mb-1">${command.title}</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">${command.description}</p>
                    </div>
                `;
                commandsContainer.appendChild(commandItem);
                
                commandItem.addEventListener('click', function() {
                    showCommandDetail(command);
                });
            });
        });
    }
    
    // Initial render
    renderCommands();
    
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const tabType = this.getAttribute('data-tab');
            renderCommands(tabType);
            
            // Clear search when switching tabs
            document.getElementById('search-input').value = '';
        });
    });
    
    // Command detail view functionality
    const commandDetail = document.getElementById('command-detail');
    const detailTitle = document.getElementById('detail-title');
    const detailSyntax = document.getElementById('detail-syntax');
    const detailDescription = document.getElementById('detail-description');
    const examplesContainer = document.getElementById('examples-container');
    const closeDetail = document.getElementById('close-detail');
    
    function showCommandDetail(command) {
        detailTitle.textContent = command.title;
        detailSyntax.textContent = command.syntax;
        detailDescription.textContent = command.description;
        
        // Clear and rebuild examples
        examplesContainer.innerHTML = '';
        
        command.examples.forEach((example, index) => {
            const exampleBlock = document.createElement('div');
            exampleBlock.className = index < command.examples.length - 1 ? 'mb-4' : '';
            
            const codeContainer = document.createElement('div');
            codeContainer.className = 'code-container bg-gray-100 dark:bg-[#252525] p-4 rounded-lg overflow-x-auto relative';
            
            // Create pre and code elements
            const pre = document.createElement('pre');
            pre.className = 'text-sm font-geist-mono text-gray-800 dark:text-gray-300';
            pre.textContent = example.code;
            
            // Add copy button
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300';
            copyButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
            `;
            
            copyButton.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Copy text
                navigator.clipboard.writeText(example.code).then(() => {
                    // Show success icon
                    this.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="copy-success">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    `;
                    
                    // Reset after 2 seconds
                    setTimeout(() => {
                        this.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        `;
                    }, 2000);
                });
            });
            
            codeContainer.appendChild(pre);
            codeContainer.appendChild(copyButton);
            
            exampleBlock.innerHTML = `
                <div class="text-sm text-gray-700 dark:text-gray-300 mb-1">${example.title}:</div>
            `;
            exampleBlock.appendChild(codeContainer);
            
            examplesContainer.appendChild(exampleBlock);
        });
        
        commandDetail.classList.remove('hidden');
        commandDetail.classList.add('show');
        commandDetail.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    closeDetail.addEventListener('click', function() {
        commandDetail.classList.add('hide');
        setTimeout(() => {
            commandDetail.classList.remove('show', 'hide');
            commandDetail.classList.add('hidden');
        }, 300);
    });
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        // Reset to all commands view and activate "all" tab when searching
        if (searchTerm === '') {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelector('[data-tab="all"]').classList.add('active');
            renderCommands();
            return;
        }
        
        commandsContainer.innerHTML = '';
        let resultsFound = false;
        
        // Flatten commands for search
        const allCommands = [];
        sqlCommands.statements.forEach(category => {
            category.commands.forEach(command => {
                allCommands.push({
                    command: command,
                    category: category.category
                });
            });
        });
        
        // Filter commands by search term
        const filteredCommands = allCommands.filter(item => {
            const command = item.command;
            const searchString = `${command.title} ${command.description} ${command.syntax}`.toLowerCase();
            
            // Also search in examples
            let examplesMatch = false;
            command.examples.forEach(example => {
                if ((example.title.toLowerCase().includes(searchTerm) || 
                     example.code.toLowerCase().includes(searchTerm))) {
                    examplesMatch = true;
                }
            });
            
            return searchString.includes(searchTerm) || examplesMatch;
        });
        
        // Group filtered commands by category for display
        const groupedResults = {};
        filteredCommands.forEach(item => {
            if (!groupedResults[item.category]) {
                groupedResults[item.category] = [];
            }
            groupedResults[item.category].push(item.command);
        });
        
        // Render search results
        Object.keys(groupedResults).forEach(category => {
            // Category header
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'col-span-1 md:col-span-2 mt-2 mb-2';
            categoryHeader.innerHTML = `
                <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                    ${category}
                </h2>
            `;
            commandsContainer.appendChild(categoryHeader);
            
            // Commands
            groupedResults[category].forEach(command => {
                const commandItem = document.createElement('div');
                commandItem.className = 'command-item bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden';
                commandItem.setAttribute('data-command', command.command);
                
                // Highlight matching text in title and description
                const highlightedTitle = highlightText(command.title, searchTerm);
                const highlightedDesc = highlightText(command.description, searchTerm);
                
                commandItem.innerHTML = `
                    <div class="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#252525]">
                        <h3 class="font-medium mb-1">${highlightedTitle}</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">${highlightedDesc}</p>
                    </div>
                `;
                commandsContainer.appendChild(commandItem);
                
                commandItem.addEventListener('click', function() {
                    showCommandDetail(command);
                });
                
                resultsFound = true;
            });
        });
        
        // Show no results message
        if (!resultsFound) {
            const noResults = document.createElement('div');
            noResults.className = 'col-span-1 md:col-span-2 text-center py-10';
            noResults.innerHTML = `
                <p class="text-gray-500 dark:text-gray-400">沒有找到符合 "${searchTerm}" 的結果</p>
            `;
            commandsContainer.appendChild(noResults);
        }
    });
    
    // Helper function to highlight search term in text
    function highlightText(text, searchTerm) {
        if (!searchTerm) return text;
        
        const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }
    
    // Helper function to escape special regex characters
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
});
