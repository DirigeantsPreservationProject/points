// Copyright (c) 2018-2019 KlasaCommunityPlugins. All rights reserved. MIT license.
import { Client, KlasaMessage, Monitor, MonitorStore } from 'klasa';

export default class PointsInitialAmount extends Monitor {
  private readonly options = this.client.options.points;

	constructor(client: Client, store: MonitorStore, file: string[], directory: string) {
		super(client, store, file, directory, { ignoreOthers: false });
	}

	async run(message: KlasaMessage) {
    if (!this.options.initialAmount) return null;
    await message.guild.members.fetch(message.author);
    await message.member.user.settings.sync();
    const receivedInitial = message.member.user.settings.get('pointsPlugin.receivedInitial') as boolean;
    if (receivedInitial) return null;
    const points = message.member.user.settings.get('pointsPlugin.count') as number;
    await message.member.user.settings.update([
      ['pointsPlugin.count', points + this.options.initialAmount],
      ['pointsPlugin.receivedInitial', true],
    ]);
    return null;
  }
}
