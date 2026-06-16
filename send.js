export default async function handler(req, res) {
    // 1. Ограничиваем доступ: разрешены только POST-запросы
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ 
            success: false, 
            error: `Method ${req.method} Not Allowed. Use POST instead.` 
        });
    }

    try {
        // 2. Деструктурируем входящие данные из тела запроса
        const { type, area, repairType, price, contact } = req.body;

        // Маппинг технических ключей в красивый читаемый текст для менеджера
        const housingMap = { new: "Новостройка 🏢", resale: "Вторичка 🧱", house: "Частный дом 🏡" };
        const repairMap = { cosmetic: "Косметический ⚡", capital: "Капитальный 🛠", designer: "Дизайнерский ✨" };

        const friendlyType = housingMap[type] || type;
        const friendlyRepair = repairMap[repairType] || repairType;

        // 3. Проверяем наличие обязательных переменных окружения на сервере Vercel
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!botToken || !chatId) {
            console.error("Missing Telegram environment variables on Vercel side.");
            return res.status(500).json({ 
                success: false, 
                error: "Server configuration error: Telegram credentials are not set." 
            });
        }

        // 4. Формируем красивое структурированное сообщение с использованием HTML-тегов
        const telegramMessage = `
🚀 <b>Получена новая заявка на расчет ремонта!</b>

• <b>Тип жилья:</b> ${friendlyType}
• <b>Площадь объекта:</b> ${area}
• <b>Тип отделки:</b> ${friendlyRepair}
• <b>Предварительная стоимость:</b> <u>${price}</u>

📞 <b>Контактные данные клиента:</b> <b>${contact}</b>
        `.trim();

        // 5. Отправляем запрос на официальный API эндпоинт Telegram
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        
        const telegramResponse = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: telegramMessage,
                parse_mode: 'HTML', // Включаем поддержку HTML-тегов в Telegram
            }),
        });

        const telegramData = await telegramResponse.json();

        // 6. Обрабатываем ответ от серверов Telegram
        if (telegramResponse.ok && telegramData.ok) {
            return res.status(200).json({ success: true });
        } else {
            console.error("Telegram API Error Response:", telegramData);
            return res.status(500).json({ 
                success: false, 
                error: telegramData.description || "Failed to deliver message to Telegram." 
            });
        }

    } catch (error) {
        // Ловим непредвиденные системные или сетевые ошибки
        console.error("Serverless Function Runtime Exception:", error);
        return res.status(500).json({ 
            success: false, 
            error: error.message || "Internal Server Error occurred." 
        });
    }
}