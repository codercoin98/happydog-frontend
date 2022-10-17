export const changeToCategory = (categories: string[]): string[] => {
    return categories.map(e => {
        switch (e) {
            case 'common':
                return '日常交流'
            case 'game':
                return '游戏攻略'
            case 'news':
                return '游戏资讯'
            case 'notice':
                return '版务公告'
            default:
                return ''
        }
    })

}