function sendToSlack(body: string, channel: string) {
  // ToDo: Entry Slack webhook URL
  let url = ''

  const payload = JSON.stringify({
    channel: channel,
    username: 'Googleフォーム Bot',
    text: body,
    icon_emoji: ':date: ',
  })
  const options = {
    method: 'POST',
    contentType: 'application/json',
    payload: payload,
  }

  return UrlFetchApp.fetch(url, options)
}

export function test() {
  // ToDo: Entry Slack channel name (ex: #general)
  sendToSlack('テスト通知確認です', '#general')
}

export function onFormSubmit(e) {
  let res = e.response.getItemResponses()

  let name = ''
  let email = ''
  let detail = ''
  for (let i = 0; i < res.length; i++) {
    const formData = res[i]
    const title = formData.getItem().getTitle()
    const response = formData.getResponse()
    // ToDo: Entry columns in order
    switch (title) {
      case 'お名前':
        name = response
        break
      case '連絡先':
        email = response
        break
      case 'お問い合わせ内容':
        detail = response
        break
      default:
        break
    }
  }

  const body = `お名前:${name}\n連絡先:${email}\nお問い合わせ内容:${detail}`

  sendToSlack(body, '#general')
}
